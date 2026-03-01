const mongoose = require("mongoose");

// Middleware to check if MongoDB is connected
const requireDB = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      error: "Database unavailable",
      message: "MongoDB is not connected. Please check server configuration.",
      hint: "Contact administrator or check MONGODB_URI in server .env"
    });
  }
  next();
};

module.exports = { requireDB };
