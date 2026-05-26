/**
 * Virtual Gurukul - Course Mongoose Schema
 * Embedded sub-schemas for curriculum lessons and graded multi-choice quizzes.
 */

const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  videoUrl: {
    type: String,
    default: "https://www.w3schools.com/html/mov_bbb.mp4"
  }
});

const QuestionSchema = new mongoose.Schema({
  q: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: Number, required: true } // index of correct option
});

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required."],
      unique: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: ["Vedic Mathematics", "Sanskrit Learning", "Yoga & Meditation", "Indian Astronomy", "Ayurveda", "Bhagavad Gita Wisdom", "Ancient Architecture", "Indian Science & Philosophy"]
    },
    instructor: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    level: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced"]
    },
    rating: {
      type: Number,
      default: 4.8
    },
    xpAward: {
      type: Number,
      default: 150
    },
    thumbnail: {
      type: String,
      default: "assets/sanskrit_manuscript.png"
    },
    description: {
      type: String,
      required: true
    },
    lessons: [LessonSchema],
    quiz: {
      questions: [QuestionSchema]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Course", CourseSchema);
