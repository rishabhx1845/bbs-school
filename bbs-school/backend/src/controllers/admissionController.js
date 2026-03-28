const Admission = require('../models/Admission');

exports.getAdmissions = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const query = {};

    if (req.query.status) query.status = req.query.status;
    if (req.query.applyingForClass) query.applyingForClass = req.query.applyingForClass;
    if (req.query.search) {
      query.$or = [
        { studentName: { $regex: req.query.search, $options: 'i' } },
        { parentName: { $regex: req.query.search, $options: 'i' } },
        { applicationId: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const [admissions, total] = await Promise.all([
      Admission.find(query)
        .populate('reviewedBy', 'name')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Admission.countDocuments(query)
    ]);

    res.json({ success: true, admissions, total, page, pages: Math.ceil(total / limit) });
  } catch (err) { next(err); }
};

exports.getAdmission = async (req, res, next) => {
  try {
    const admission = await Admission.findById(req.params.id).populate('reviewedBy', 'name');
    if (!admission) return res.status(404).json({ success: false, message: 'Application not found' });
    res.json({ success: true, admission });
  } catch (err) { next(err); }
};

exports.submitAdmission = async (req, res, next) => {
  try {
    const admission = await Admission.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Admission application submitted successfully! We will contact you soon.',
      applicationId: admission.applicationId,
      admission
    });
  } catch (err) { next(err); }
};

exports.updateAdmissionStatus = async (req, res, next) => {
  try {
    const { status, remarks } = req.body;
    const admission = await Admission.findByIdAndUpdate(
      req.params.id,
      { status, remarks, reviewedBy: req.user.id, reviewedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!admission) return res.status(404).json({ success: false, message: 'Application not found' });
    res.json({ success: true, message: `Application status updated to ${status}`, admission });
  } catch (err) { next(err); }
};

exports.deleteAdmission = async (req, res, next) => {
  try {
    await Admission.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Application deleted' });
  } catch (err) { next(err); }
};

module.exports = exports;
