/**
 * Virtual Gurukul - Enrollment Mongoose Schema
 */

const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },
    lessonIndex: {
      type: Number,
      default: 0
    },
    completed: {
      type: Boolean,
      default: false
    },
    quizScore: {
      type: Number,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Prevent redundant student enrollment pairs
EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

module.exports = mongoose.model("Enrollment", EnrollmentSchema);
