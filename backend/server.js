/**
 * Virtual Gurukul - Core API Express Bootstrap Server
 */

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");

// Connect database Mongoose adapter
connectDB();

const app = express();

// Standard middlewares
app.use(cors());
app.use(express.json());

// Main entry status check
app.get("/", (req, res) => {
  res.json({
    status: "active",
    platform: "Virtual Gurukul API Matrix",
    linage: "Guru-Shishya traditional digital system",
    version: "1.0.0"
  });
});

// Bind API endpoint gateways
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

// Fallback Page Not Found Handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Endpoint not found in Sanskrit archives." });
});

// Unified Global Exception Interceptor
app.use((err, req, res, next) => {
  console.error(`❌ Global Server Exception: ${err.message}`);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error occurred."
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🕉️ Gurukul Server active in '${process.env.NODE_ENV}' mode on Port: ${PORT}`);
});
