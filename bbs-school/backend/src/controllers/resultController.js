const Result = require('../models/Result');

exports.getResults = async (req, res, next) => {
  try {
    const query = {};
    if (req.query.class) query.class = req.query.class;
    if (req.query.section) query.section = req.query.section;
    if (req.query.examType) query.examType = req.query.examType;
    if (req.query.session) query.session = req.query.session;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const [results, total] = await Promise.all([
      Result.find(query)
        .populate('studentId', 'name rollNo class section')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Result.countDocuments(query)
    ]);

    res.json({ success: true, results, total, page, pages: Math.ceil(total / limit) });
  } catch (err) { next(err); }
};

exports.getStudentResults = async (req, res, next) => {
  try {
    // Students can only see their own results
    if (req.user.role === 'student') {
      const { studentId } = req.params;
      // Verify ownership would go here
    }

    const results = await Result.find({ studentId: req.params.studentId })
      .populate('studentId', 'name rollNo class')
      .sort({ createdAt: -1 });

    res.json({ success: true, results });
  } catch (err) { next(err); }
};

exports.createResult = async (req, res, next) => {
  try {
    const result = await Result.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json({ success: true, message: 'Result created successfully', result });
  } catch (err) { next(err); }
};

exports.updateResult = async (req, res, next) => {
  try {
    const result = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!result) return res.status(404).json({ success: false, message: 'Result not found' });
    res.json({ success: true, message: 'Result updated', result });
  } catch (err) { next(err); }
};

exports.deleteResult = async (req, res, next) => {
  try {
    await Result.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Result deleted' });
  } catch (err) { next(err); }
};

module.exports = exports;
