/**
 * Virtual Gurukul - Authentication Controllers
 */

const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Generate JWT token utility
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "vedic_sacred_key", {
    expiresIn: "30d"
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  try {
    const { fullName, username, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ success: false, message: "Username or Email already registered in Gurukul." });
    }

    // Create user
    const user = await User.create({
      fullName,
      username,
      email,
      password,
      role: role || "student",
      avatar: role === "guru" ? "🧘" : role === "admin" ? "👑" : "🕉️"
    });

    if (user) {
      res.status(201).json({
        success: true,
        token: generateToken(user._id),
        user: {
          id: user._id,
          fullName: user.fullName,
          username: user.username,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          xp: user.xp,
          streak: user.streak,
          badges: user.badges
        }
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Authenticate user
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body; // username can be username or email

    // Check for user
    const user = await User.findOne({
      $or: [{ email: username.toLowerCase() }, { username: username.toLowerCase() }]
    }).select("+password");

    if (user && (await user.matchPassword(password))) {
      
      // Calculate streak boost
      const today = new Date().toDateString();
      const lastLog = new Date(user.lastLogin).toDateString();
      
      if (today !== lastLog) {
        const msDiff = new Date(today) - new Date(lastLog);
        const daysDiff = msDiff / (1000 * 60 * 60 * 24);
        
        if (daysDiff === 1) {
          user.streak += 1;
          user.xp += 20; // 20 XP streak gift
        } else if (daysDiff > 1) {
          user.streak = 1; // reset
        }
        user.lastLogin = Date.now();
        await user.save();
      }

      res.json({
        success: true,
        token: generateToken(user._id),
        user: {
          id: user._id,
          fullName: user.fullName,
          username: user.username,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          xp: user.xp,
          streak: user.streak,
          badges: user.badges
        }
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid Gurukul credentials." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    res.json({ success: true, user: req.user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
