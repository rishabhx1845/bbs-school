const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  applicationId: {
    type: String,
    unique: true
  },
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: [true, 'Gender is required']
  },
  applyingForClass: {
    type: String,
    required: [true, 'Class is required'],
    enum: ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  },
  previousSchool: String,
  parentName: {
    type: String,
    required: [true, 'Parent name is required']
  },
  relation: {
    type: String,
    enum: ['father', 'mother', 'guardian'],
    required: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  email: {
    type: String,
    lowercase: true
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  message: String,
  status: {
    type: String,
    enum: ['pending', 'under-review', 'approved', 'rejected', 'waitlist'],
    default: 'pending'
  },
  remarks: String,
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: Date
}, { timestamps: true });

// Generate application ID before save
admissionSchema.pre('save', async function (next) {
  if (!this.applicationId) {
    const year = new Date().getFullYear();
    const count = await this.constructor.countDocuments();
    this.applicationId = `APP${year}${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Admission', admissionSchema);
