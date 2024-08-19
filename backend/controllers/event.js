const { model } = require("mongoose");
const Event = require("../models/Event");

const createEvent = async (req, res) => {
    const { title, description, date, time } = req.body;
    try {
        const event = await Event.create({ title, description, date, time });
        return res.status(200).json({ success: true, event });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}


const getAllEvents = async (req, res) => {
    try {
        // Fetch events where the date is greater than or equal to today's date
        const events = await Event.find({ date: { $gte: new Date().toISOString().split('T')[0] } });

        // Return the events with a success status
        return res.status(200).json({ success: true, events });
    } catch (error) {
        // Log the error (for debugging) and return a 500 status with an error message
        console.error('Error fetching events:', error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

const getNumberOfUsersPresent = async (req, res) => {

    try {
        const events = await Event.find().populate('attendance');
        let totalUsersPresent = 0;

        events.forEach(event => {
            totalUsersPresent += event.attendance.length;
        });
        console.log("totalUsersPresent", totalUsersPresent);
        return res.status(200).json({ success: true, totalUsersPresent });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong", error });
    }
};

const getNumberOfEventsByType = async (req, res) => {
    try {
        const events = await Event.aggregate([
            {
                $group: {
                    _id: "$type",
                    count: { $sum: 1 }
                }
            }
        ]);

        return res.status(200).json({ success: true, eventsByType: events });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong", error });
    }
};

const getUsersPresentInEvent = async (req, res) => {
    const { eventId } = req.params;

    try {
        const event = await Event.findById(eventId).populate('attendance');
        if (!event) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }

        const usersPresent = event.attendance.length;

        return res.status(200).json({ success: true, usersPresent });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong", error });
    }
};

const getTotalNumberOfEvents = async (req, res) => {
    try {
        const totalEvents = await Event.find()
        let transformedEvents = totalEvents.map(event => {
            return {
                title:event.title,
                noOfPresentUsers:event.attendance.length,
                description:event.description
            }
        })

        return res.status(200).json({ success: true, transformedEvents });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong", error });
    }
};

const getEventParticipationOverTime = async (req, res) => {
    try {
        const events = await Event.aggregate([
            {
                $project: {
                    date: 1,
                    attendanceCount: { $size: "$attendance" }
                }
            },
            {
                $group: {
                    _id: "$date",
                    totalParticipants: { $sum: "$attendanceCount" }
                }
            },
            {
                $sort: { _id: 1 }  // Sort by date
            }
        ]);

        return res.status(200).json({ success: true, participationOverTime: events });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong", error });
    }
};


module.exports = { createEvent , getAllEvents, getNumberOfUsersPresent, getNumberOfEventsByType, getUsersPresentInEvent, getTotalNumberOfEvents, getEventParticipationOverTime};