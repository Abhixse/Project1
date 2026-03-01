const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    req.adminId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.role !== "admin") {
    return res.status(403).json({ error: "Admin privileges required" });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin };
