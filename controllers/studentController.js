const Student = require('../models/Student');

exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ success: true, data: student });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'A student with this email already exists' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join('. ') });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100);
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const [students, total] = await Promise.all([
      Student.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Student.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      count: students.length,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: students,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid student ID' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { name, email, age, grade, status } = req.body;
    if (!name || !email || !age || !grade) {
      return res.status(400).json({ success: false, message: 'Name, email, age, and grade are required for full update' });
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, email, age, grade, status },
      { new: true, runValidators: true },
    );

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join('. ') });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid student ID' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.patchStudent = async (req, res) => {
  try {
    const allowedFields = ['name', 'email', 'age', 'grade', 'status'];
    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: 'No valid fields provided to update' });
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true },
    );

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join('. ') });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid student ID' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid student ID' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
