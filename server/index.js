const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();

// Import database and models
const connectDB = require("./config/db");
const Admin = require("./models/Admin");
const Content = require("./models/Content");

// Import middleware
const { verifyToken, verifyAdmin } = require("./middleware/auth");
const { validateContent, validateAdmin, validateLogin } = require("./middleware/validate");
const { apiLimiter, loginLimiter, contentLimiter } = require("./middleware/rateLimiter");
const { requireDB } = require("./middleware/dbCheck");

const app = express();

// Connect to MongoDB (non-blocking)
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(apiLimiter); // Apply rate limiting to all routes

// ============================================
// ADMIN AUTHENTICATION ROUTES
// ============================================

// Register new admin (first time setup) - No auth required for first user
app.post("/api/admin/register", requireDB, loginLimiter, validateAdmin, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if any admin exists (for initial setup)
    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      return res.status(403).json({ error: "Admin registration closed. Contact existing admin." });
    }

    // Check if user already exists
    const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });
    if (existingAdmin) {
      return res.status(409).json({ error: "Username or email already exists" });
    }

    // Create new admin with "admin" role for the first user
    const admin = new Admin({
      username,
      email,
      password,
      role: "admin",
    });

    await admin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Admin login
app.post("/api/admin/login", requireDB, loginLimiter, validateLogin, async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare passwords
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      admin: admin.toJSON(),
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

// Get current admin info
app.get("/api/admin/me", requireDB, verifyToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.json(admin.toJSON());
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch admin info" });
  }
});

// ============================================
// CONTENT CRUD ROUTES (CMS)
// ============================================

// Get all content with optional filtering
app.get("/api/content", requireDB, async (req, res) => {
  try {
    const { type, isActive } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (isActive !== undefined) filter.isActive = isActive === "true";

    const content = await Content.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(content);
  } catch (error) {
    console.error("Get content error:", error);
    res.status(500).json({ error: "Failed to fetch content" });
  }
});

// Get single content item
app.get("/api/content/:id", requireDB, async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch content" });
  }
});

// Create new content (requires auth)
app.post("/api/content", requireDB, verifyToken, contentLimiter, validateContent, async (req, res) => {
  try {
    const newContent = new Content({
      ...req.body,
      createdBy: req.adminId,
    });

    await newContent.save();
    res.status(201).json({ message: "Content created successfully", content: newContent });
  } catch (error) {
    console.error("Create content error:", error);
    res.status(500).json({ error: "Failed to create content" });
  }
});

// Update content (requires auth)
app.put("/api/content/:id", requireDB, verifyToken, contentLimiter, validateContent, async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    res.json({ message: "Content updated successfully", content });
  } catch (error) {
    console.error("Update content error:", error);
    res.status(500).json({ error: "Failed to update content" });
  }
});

// Delete content (requires admin role)
app.delete("/api/content/:id", requireDB, verifyToken, verifyAdmin, async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);

    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    res.json({ message: "Content deleted successfully" });
  } catch (error) {
    console.error("Delete content error:", error);
    res.status(500).json({ error: "Failed to delete content" });
  }
});

// Bulk update content order (for drag-drop functionality)
app.post("/api/content/reorder", requireDB, verifyToken, async (req, res) => {
  try {
    const { items } = req.body;

    for (const item of items) {
      await Content.findByIdAndUpdate(item.id, { order: item.order });
    }

    res.json({ message: "Content reordered successfully" });
  } catch (error) {
    console.error("Reorder content error:", error);
    res.status(500).json({ error: "Failed to reorder content" });
  }
});

// ============================================
// CONTACT FORM ROUTE (Existing functionality)
// ============================================

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, company, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_RECEIVER || "abhisheek227@gmail.com",
      subject: `Contact form: ${subject}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "-"}</p>
        <p><strong>Company:</strong> ${company || "-"}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.json({ ok: true });
  } catch (err) {
    console.error("Error sending email:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
});

// ============================================
// HEALTH CHECK
// ============================================

app.get("/api/health", (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const dbStates = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting"
  };
  
  res.json({
    status: "ok",
    message: "Server is running",
    database: {
      status: dbStates[dbStatus] || "unknown",
      ready: dbStatus === 1
    },
    timestamp: new Date().toISOString()
  });
});

// ============================================
// START SERVER
// ============================================

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`\n✓ Server running on http://localhost:${port}`);
  console.log(`✓ API: http://localhost:${port}/api`);
  console.log(`✓ Health check: http://localhost:${port}/api/health`);
  console.log(`\n📝 First time? Register admin at POST /api/admin/register\n`);
});
