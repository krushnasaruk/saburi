/**
 * Virtual Gurukul - Course Curriculum & Administration Routing Mapping
 */

const express = require("express");
const router = express.Router();
const { getCourses, getCourseById, createCourse, deleteCourse, getAnalytics } = require("../controllers/courseController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getCourses);
router.get("/:id", getCourseById);

// Guru & Admin clear endpoints
router.post("/", protect, restrictTo("guru", "admin"), createCourse);
router.delete("/:id", protect, restrictTo("admin"), deleteCourse);

// Admin-only metrics endpoint
router.get("/admin/analytics", protect, restrictTo("admin"), getAnalytics);

module.exports = router;
