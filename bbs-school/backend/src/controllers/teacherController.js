// ====== teacherController.js ======
const Teacher = require('../models/Teacher');

exports.getTeachers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const query = { isActive: true };
    if (req.query.subject) query.subject = { $regex: req.query.subject, $options: 'i' };
    if (req.query.search) query.name = { $regex: req.query.search, $options: 'i' };

    const [teachers, total] = await Promise.all([
      Teacher.find(query).skip((page - 1) * limit).limit(limit),
      Teacher.countDocuments(query)
    ]);
    res.json({ success: true, teachers, total, page, pages: Math.ceil(total / limit) });
  } catch (err) { next(err); }
};

exports.getTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ success: false, message: 'Teacher not found' });
    res.json({ success: true, teacher });
  } catch (err) { next(err); }
};

exports.createTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.create(req.body);
    res.status(201).json({ success: true, message: 'Teacher created successfully', teacher });
  } catch (err) { next(err); }
};

exports.updateTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!teacher) return res.status(404).json({ success: false, message: 'Teacher not found' });
    res.json({ success: true, message: 'Teacher updated', teacher });
  } catch (err) { next(err); }
};

exports.deleteTeacher = async (req, res, next) => {
  try {
    await Teacher.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: 'Teacher deleted' });
  } catch (err) { next(err); }
};

module.exports = exports;
