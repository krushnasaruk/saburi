/**
 * Virtual Gurukul - Authentication Controllers (Prisma/SQL)
 */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");

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
    const userExists = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email.toLowerCase() },
          { username: username.toLowerCase() }
        ]
      }
    });

    if (userExists) {
      return res.status(400).json({ success: false, message: "Username or Email already registered in Gurukul." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await prisma.user.create({
      data: {
        fullName,
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password: hashedPassword,
        role: role || "student",
        avatar: role === "guru" ? "🧘" : role === "admin" ? "👑" : "🕉️"
      }
    });

    res.status(201).json({
      success: true,
      token: generateToken(user.id),
      user: {
        id: user.id,
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
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Authenticate user
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check for user
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: username.toLowerCase() },
          { username: username.toLowerCase() }
        ]
      }
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      
      // Calculate streak boost
      const today = new Date().toDateString();
      const lastLog = new Date(user.lastLogin).toDateString();
      
      let newStreak = user.streak;
      let newXp = user.xp;
      
      if (today !== lastLog) {
        const msDiff = new Date(today) - new Date(lastLog);
        const daysDiff = msDiff / (1000 * 60 * 60 * 24);
        
        if (daysDiff === 1) {
          newStreak += 1;
          newXp += 20; // 20 XP streak gift
        } else if (daysDiff > 1) {
          newStreak = 1; // reset
        }
        
        await prisma.user.update({
          where: { id: user.id },
          data: {
            streak: newStreak,
            xp: newXp,
            lastLogin: new Date()
          }
        });
      }

      res.json({
        success: true,
        token: generateToken(user.id),
        user: {
          id: user.id,
          fullName: user.fullName,
          username: user.username,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          xp: newXp,
          streak: newStreak,
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
