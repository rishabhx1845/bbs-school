const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Notice title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Notice content is required']
  },
  category: {
    type: String,
    enum: ['general', 'exam', 'event', 'holiday', 'result', 'admission', 'sports', 'cultural'],
    default: 'general'
  },
  isImportant: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  targetAudience: {
    type: String,
    enum: ['all', 'students', 'teachers', 'parents'],
    default: 'all'
  },
  expiresAt: Date,
  attachmentUrl: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  views: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

// Index for search
noticeSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Notice', noticeSchema);
