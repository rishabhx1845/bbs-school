const Student = require('../models/Student');

// @desc    Get all students (paginated + search)
// @route   GET /api/students
// @access  Admin/Teacher
exports.getStudents = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = { isActive: true };

    if (req.query.class) query.class = req.query.class;
    if (req.query.section) query.section = req.query.section;
    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { rollNo: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const [students, total] = await Promise.all([
      Student.find(query).sort({ class: 1, rollNo: 1 }).skip(skip).limit(limit),
      Student.countDocuments(query)
    ]);

    res.json({
      success: true,
      students,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single student
// @route   GET /api/students/:id
// @access  Admin/Teacher/Student(own)
exports.getStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // Students can only view their own profile
    if (req.user.role === 'student' && student.userId?.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.json({ success: true, student });
  } catch (error) {
    next(error);
  }
};

// @desc    Create student
// @route   POST /api/students
// @access  Admin
exports.createStudent = async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ success: true, message: 'Student created successfully', student });
  } catch (error) {
    next(error);
  }
};

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Admin
exports.updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.json({ success: true, message: 'Student updated successfully', student });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete student (soft delete)
// @route   DELETE /api/students/:id
// @access  Admin
exports.deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    next(error);
  }
};
