const express = require('express');
const { register, login, getUser, isAuthenticated, getAllUsers, getAttendanceBreakdownByRole, logout } = require('../controllers/user');
const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.get('/get-user',isAuthenticated, getUser)
router.get('/getAllUsers', isAuthenticated, getAllUsers);
router.get('getAttendanceBreakdownByRole', isAuthenticated, getAttendanceBreakdownByRole);
router.get('/logout', logout)
module.exports = router;