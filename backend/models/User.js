/**
 * Virtual Gurukul - User Mongoose Schema
 * Supports students, gurus, and admins, complete with streak trackers and bcrypt password hashing.
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please add your complete name."],
      trim: true
    },
    username: {
      type: String,
      required: [true, "Please add a unique username."],
      unique: true,
      trim: true,
      lowercase: true
    },
    email: {
      type: String,
      required: [true, "Please add an email address."],
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, "Please secure your profile with a password."],
      minlength: 6,
      select: false
    },
    role: {
      type: String,
      enum: ["student", "guru", "admin"],
      default: "student"
    },
    avatar: {
      type: String,
      default: "🕉️"
    },
    xp: {
      type: Number,
      default: 100 // initial gift
    },
    streak: {
      type: Number,
      default: 1
    },
    lastLogin: {
      type: Date,
      default: Date.now
    },
    badges: {
      type: [String],
      default: ["veda_novice"]
    }
  },
  {
    timestamps: true
  }
);

// Hash password with bcrypt before saving to DB
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password input to database hash
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
