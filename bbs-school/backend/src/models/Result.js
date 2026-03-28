const mongoose = require('mongoose');

const subjectResultSchema = new mongoose.Schema({
  name: { type: String, required: true },
  maxMarks: { type: Number, required: true },
  marksObtained: { type: Number, required: true },
  grade: String,
  remarks: String
});

// Auto compute grade
subjectResultSchema.pre('save', function (next) {
  const percent = (this.marksObtained / this.maxMarks) * 100;
  if (percent >= 90) this.grade = 'A+';
  else if (percent >= 80) this.grade = 'A';
  else if (percent >= 70) this.grade = 'B+';
  else if (percent >= 60) this.grade = 'B';
  else if (percent >= 50) this.grade = 'C';
  else if (percent >= 33) this.grade = 'D';
  else this.grade = 'F';
  next();
});

const resultSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: [true, 'Student reference is required']
  },
  class: {
    type: String,
    required: [true, 'Class is required']
  },
  section: String,
  examType: {
    type: String,
    enum: ['unit-test-1', 'unit-test-2', 'midterm', 'annual', 'pre-board'],
    required: [true, 'Exam type is required']
  },
  session: {
    type: String,
    required: [true, 'Session is required']
  },
  subjects: [subjectResultSchema],
  totalMarks: Number,
  marksObtained: Number,
  percentage: Number,
  overallGrade: String,
  rank: Number,
  remarks: String,
  publishedAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

// Calculate totals before save
resultSchema.pre('save', function (next) {
  if (this.subjects && this.subjects.length > 0) {
    this.totalMarks = this.subjects.reduce((sum, s) => sum + s.maxMarks, 0);
    this.marksObtained = this.subjects.reduce((sum, s) => sum + s.marksObtained, 0);
    this.percentage = parseFloat(((this.marksObtained / this.totalMarks) * 100).toFixed(2));
    const p = this.percentage;
    if (p >= 90) this.overallGrade = 'A+';
    else if (p >= 80) this.overallGrade = 'A';
    else if (p >= 70) this.overallGrade = 'B+';
    else if (p >= 60) this.overallGrade = 'B';
    else if (p >= 50) this.overallGrade = 'C';
    else if (p >= 33) this.overallGrade = 'D';
    else this.overallGrade = 'F';
  }
  next();
});

module.exports = mongoose.model('Result', resultSchema);
