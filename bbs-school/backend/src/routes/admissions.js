const express = require('express');
const router = express.Router();
const { getAdmissions, getAdmission, submitAdmission, updateAdmissionStatus, deleteAdmission } = require('../controllers/admissionController');
const { protect, authorize } = require('../middleware/auth');

// Public
router.post('/', submitAdmission);

// Protected
router.get('/', protect, authorize('admin'), getAdmissions);
router.get('/:id', protect, authorize('admin'), getAdmission);
router.put('/:id', protect, authorize('admin'), updateAdmissionStatus);
router.delete('/:id', protect, authorize('admin'), deleteAdmission);

module.exports = router;
