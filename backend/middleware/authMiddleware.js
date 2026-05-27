/**
 * Virtual Gurukul - JWT Validation & Role-Based Authorization Middlewares (Prisma/SQL)
 */

const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

// Verifies Bearer tokens in headers and matches DB users
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "vedic_sacred_key");

      // Retrieve user from DB
      const user = await prisma.user.findUnique({
        where: { id: decoded.id }
      });

      if (!user) {
        return res.status(401).json({ success: false, message: "User not found in Gurukul logs." });
      }

      // Omit password field
      delete user.password;
      req.user = user;

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ success: false, message: "Credential token invalid or expired." });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Authorization token missing." });
  }
};

// Restricts endpoints access to specific roles (student, guru, admin)
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Role '${req.user ? req.user.role : "visitor"}' does not hold clearance privileges.`
      });
    }
    next();
  };
};

module.exports = { protect, restrictTo };
