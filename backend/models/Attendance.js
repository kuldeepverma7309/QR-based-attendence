// models/Attendance.js
const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: String,
    required: true,
    trim: true
  },
  time: {
    type: String,
    trim: true
  }
}, { timestamps: true });

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;
