const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Teacher name is required'],
    trim: true
  },
  employeeId: {
    type: String,
    required: [true, 'Employee ID is required'],
    unique: true
  },
  subject: {
    type: String,
    required: [true, 'Subject is required']
  },
  qualification: {
    type: String,
    required: [true, 'Qualification is required']
  },
  experience: {
    type: Number,
    default: 0
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  email: {
    type: String,
    lowercase: true
  },
  address: String,
  joiningDate: {
    type: Date,
    default: Date.now
  },
  photo: {
    type: String,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);
