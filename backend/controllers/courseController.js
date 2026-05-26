/**
 * Virtual Gurukul - Course Controllers & Admin Analytics API
 */

const Course = require("../models/Course");
const User = require("../models/User");
const Enrollment = require("../models/Enrollment");

// @desc    Get all courses with optional filters
// @route   GET /api/courses
// @access  Public
exports.getCourses = async (req, res) => {
  try {
    const { level, category } = req.query;
    let query = {};

    if (level) query.level = level;
    if (category) query.category = category;

    const courses = await Course.find(query);
    res.json({ success: true, count: courses.length, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get course by ID
// @route   GET /api/courses/:id
// @access  Public
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course archive not found." });
    }
    res.json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create course
// @route   POST /api/courses
// @access  Private (Guru / Admin only)
exports.createCourse = async (req, res) => {
  try {
    const newCourse = await Course.create(req.body);
    res.status(201).json({ success: true, course: newCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private (Admin only)
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course already removed or missing." });
    }
    await Course.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Course archive wiped successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Chancellor Analytics
// @route   GET /api/admin/analytics
// @access  Private (Admin only)
exports.getAnalytics = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const coursesCount = await Course.countDocuments();
    const enrollmentsCount = await Enrollment.countDocuments();

    const users = await User.find().select("xp streak");
    const totalXP = users.reduce((acc, u) => acc + u.xp, 0);
    const averageStreak = users.length > 0 ? (users.reduce((acc, u) => acc + u.streak, 0) / users.length).toFixed(1) : 0;

    res.json({
      success: true,
      analytics: {
        totalUsers: usersCount,
        totalCourses: coursesCount,
        totalEnrollments: enrollmentsCount,
        totalXP,
        averageStreak
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
