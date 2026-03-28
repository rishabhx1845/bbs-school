const express = require('express');
const router = express.Router();
const { getNotices, getNotice, createNotice, updateNotice, deleteNotice } = require('../controllers/noticeController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getNotices);
router.get('/:id', getNotice);

// Protected routes
router.post('/', protect, authorize('admin'), createNotice);
router.put('/:id', protect, authorize('admin'), updateNotice);
router.delete('/:id', protect, authorize('admin'), deleteNotice);

module.exports = router;
