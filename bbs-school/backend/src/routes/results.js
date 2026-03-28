const express = require('express');
const router = express.Router();
const { getResults, getStudentResults, createResult, updateResult, deleteResult } = require('../controllers/resultController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(authorize('admin', 'teacher'), getResults)
  .post(authorize('admin', 'teacher'), createResult);

router.get('/student/:studentId', authorize('admin', 'teacher', 'student'), getStudentResults);

router.route('/:id')
  .put(authorize('admin', 'teacher'), updateResult)
  .delete(authorize('admin'), deleteResult);

module.exports = router;
