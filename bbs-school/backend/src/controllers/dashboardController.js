const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Notice = require('../models/Notice');
const Admission = require('../models/Admission');
const Result = require('../models/Result');

exports.getStats = async (req, res, next) => {
  try {
    const [
      totalStudents,
      totalTeachers,
      totalNotices,
      pendingAdmissions,
      recentAdmissions,
      recentNotices,
      classWiseStudents
    ] = await Promise.all([
      Student.countDocuments({ isActive: true }),
      Teacher.countDocuments({ isActive: true }),
      Notice.countDocuments({ isPublished: true }),
      Admission.countDocuments({ status: 'pending' }),
      Admission.find({ status: 'pending' }).sort({ createdAt: -1 }).limit(5),
      Notice.find({ isPublished: true }).sort({ createdAt: -1 }).limit(5),
      Student.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$class', count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ])
    ]);

    res.json({
      success: true,
      stats: {
        totalStudents,
        totalTeachers,
        totalNotices,
        pendingAdmissions,
        recentAdmissions,
        recentNotices,
        classWiseStudents
      }
    });
  } catch (err) { next(err); }
};

module.exports = exports;
