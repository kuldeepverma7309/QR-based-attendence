// register user

const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Event = require("../models/Event");
const mongoose = require('mongoose');
const Attendance = require("../models/Attendance");


const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    sameSite: 'none',
    secure: true
}

const register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });
        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await User.create({ email, password: hashedPassword, name });
        const token = jwt.sign({ _id: result._id }, process.env.JWT_SECRET || 'test', { expiresIn: "24h" });
        return res.status(200).cookie("attendence", token, cookieOptions).json({ success: true, result });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User does not exist" });
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET || 'test', { expiresIn: "24h" });
        return res.status(200).cookie("attendence", token, cookieOptions).json({ success: true, result: existingUser });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}

const getUser = async (req, res) => {
    const user = await User.findById(req.userId);
    return res.status(200).json({ success: true, user });
}


const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.attendence;
        if (!token) return res.status(401).json({ message: "Unauthenticated" });

        jwt.verify(token, 'test', (err, decoded) => {
            if (err) return res.status(401).json({ message: "Unauthenticated" });
            req.userId = decoded?._id;
            next();
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const logout = async (req, res) => {
    return res.cookie("attendence", "", { ...cookieOptions, expires: new Date(0) }).json({ success: true, message: "Logged out" });
}

const makePresent = async (req, res) => {

    const { eventId, date } = req.body;
    const event = new mongoose.Types.ObjectId(eventId);
    const now = new Date(Date.now());
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Format the time as a string (e.g., "14:30:15")
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Mark student present
    await Event.findByIdAndUpdate(eventId, { $push: { attendance: req.userId } });

    // Create attendance record
    const attendance = await Attendance.create({ event: event, user: req.userId, time: formattedTime, date });

    return res.status(200).json({ success: true, attendance, message: "Marked present successfully." });
}


const getAttendance = async (req, res) => {
    const attendance = await Event.findById({ attendance: req.userId })
    return res.status(200).json({ success: true, attendance });
}

const getAllUsers = async (req, res) => {
    const users = await User.find({ role: 'user' });
    return res.status(200).json({ success: true, users });
}


const getAttendanceBreakdownByRole = async (req, res) => {
    const { eventId } = req.params;

    try {
        const event = await Event.findById(eventId).populate('attendance');
        if (!event) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }

        const roleCounts = await User.aggregate([
            {
                $match: {
                    _id: { $in: event.attendance }
                }
            },
            {
                $group: {
                    _id: "$role",
                    count: { $sum: 1 }
                }
            }
        ]);

        return res.status(200).json({ success: true, roleCounts });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong", error });
    }
};

module.exports = { register, login, isAuthenticated, makePresent, getAttendance, getUser, getAllUsers, getAttendanceBreakdownByRole,logout };