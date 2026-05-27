/**
 * Virtual Gurukul - Course Controllers & Admin Analytics API (Prisma/SQL)
 */

const prisma = require("../config/prisma");

// @desc    Get all courses with optional filters
// @route   GET /api/courses
// @access  Public
exports.getCourses = async (req, res) => {
  try {
    const { level, category } = req.query;
    let where = {};

    if (level) where.level = level;
    if (category) where.category = category;

    const courses = await prisma.course.findMany({
      where,
      include: {
        lessons: true,
        questions: true
      }
    });
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
    const course = await prisma.course.findUnique({
      where: { id: req.params.id },
      include: {
        lessons: true,
        questions: true
      }
    });
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
    const { lessons, quiz, ...courseData } = req.body;
    
    // Convert Mongoose nested structure to Prisma nested create
    const createData = { ...courseData };
    
    if (lessons && lessons.length > 0) {
      createData.lessons = {
        create: lessons
      };
    }
    
    if (quiz && quiz.questions && quiz.questions.length > 0) {
      createData.questions = {
        create: quiz.questions
      };
    }

    const newCourse = await prisma.course.create({
      data: createData,
      include: {
        lessons: true,
        questions: true
      }
    });
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
    const course = await prisma.course.findUnique({
      where: { id: req.params.id }
    });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course already removed or missing." });
    }
    await prisma.course.delete({
      where: { id: req.params.id }
    });
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
    const usersCount = await prisma.user.count();
    const coursesCount = await prisma.course.count();
    const enrollmentsCount = await prisma.enrollment.count();

    const users = await prisma.user.findMany({
      select: { xp: true, streak: true }
    });
    
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
