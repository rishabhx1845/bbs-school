const Notice = require('../models/Notice');

exports.getNotices = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const query = { isPublished: true };

    if (req.query.category) query.category = req.query.category;
    if (req.query.isImportant) query.isImportant = req.query.isImportant === 'true';
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { content: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // Exclude expired notices
    query.$or = query.$or || [];
    query.$and = [
      { $or: [{ expiresAt: null }, { expiresAt: { $gte: new Date() } }] }
    ];

    const [notices, total] = await Promise.all([
      Notice.find(query)
        .populate('createdBy', 'name')
        .sort({ isImportant: -1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Notice.countDocuments(query)
    ]);

    res.json({ success: true, notices, total, page, pages: Math.ceil(total / limit) });
  } catch (err) { next(err); }
};

exports.getNotice = async (req, res, next) => {
  try {
    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('createdBy', 'name');

    if (!notice) return res.status(404).json({ success: false, message: 'Notice not found' });
    res.json({ success: true, notice });
  } catch (err) { next(err); }
};

exports.createNotice = async (req, res, next) => {
  try {
    const notice = await Notice.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json({ success: true, message: 'Notice posted successfully', notice });
  } catch (err) { next(err); }
};

exports.updateNotice = async (req, res, next) => {
  try {
    const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!notice) return res.status(404).json({ success: false, message: 'Notice not found' });
    res.json({ success: true, message: 'Notice updated', notice });
  } catch (err) { next(err); }
};

exports.deleteNotice = async (req, res, next) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Notice deleted' });
  } catch (err) { next(err); }
};

module.exports = exports;
