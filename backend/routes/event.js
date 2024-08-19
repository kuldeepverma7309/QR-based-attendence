const express = require('express');
const { createEvent, getAllEvents, getNumberOfUsersPresent, getNumberOfEventsByType, getUsersPresentInEvent, getTotalNumberOfEvents, getEventParticipationOverTime } = require('../controllers/event');
const { getAttendance, makePresent, isAuthenticated } = require('../controllers/user');
const router = express.Router();

router.post('/create', createEvent)
router.get('/attendence', getAttendance)
router.post('/markPresent',isAuthenticated, makePresent)
router.get("/getAllEvents", isAuthenticated,getAllEvents);
router.get("/getNumberOfUsersPresent", isAuthenticated, getNumberOfUsersPresent);
router.get("/getNumberOfEventsByType", isAuthenticated, getNumberOfEventsByType);
router.get("/getUsersPresentInEvent/:eventId", isAuthenticated, getUsersPresentInEvent);
router.get("/getTotalNoOfEvents", isAuthenticated, getTotalNumberOfEvents);
router.get("/getEventParticipationOverTime", isAuthenticated, getEventParticipationOverTime);   
module.exports = router;