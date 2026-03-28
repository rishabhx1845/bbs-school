const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true
  },
  rollNo: {
    type: String,
    required: [true, 'Roll number is required'],
    unique: true,
    trim: true
  },
  class: {
    type: String,
    required: [true, 'Class is required'],
    enum: ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  },
  section: {
    type: String,
    enum: ['A', 'B', 'C', 'D'],
    default: 'A'
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
  },
  parentName: {
    type: String,
    required: [true, 'Parent name is required']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[6-9]\d{9}$/, 'Please enter a valid Indian phone number']
  },
  email: {
    type: String,
    lowercase: true
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  admissionDate: {
    type: Date,
    default: Date.now
  },
  session: {
    type: String,
    default: () => {
      const year = new Date().getFullYear();
      return `${year}-${year + 1}`;
    }
  },
  photo: {
    type: String,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  previousSchool: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

// Index for search
studentSchema.index({ name: 'text', rollNo: 'text' });

module.exports = mongoose.model('Student', studentSchema);
