const validator = require("validator");

const sanitizeInput = (input) => {
  if (typeof input !== "string") return input;
  return validator.trim(validator.escape(input));
};

const validateContent = (req, res, next) => {
  const { type, title, description } = req.body;

  // Validate type
  const validTypes = ["industry", "material", "testimonial", "product", "feature", "section"];
  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: "Invalid content type" });
  }

  // Validate title
  if (!title || typeof title !== "string" || title.trim().length === 0) {
    return res.status(400).json({ error: "Title is required and must be a non-empty string" });
  }

  // Sanitize inputs
  req.body.title = sanitizeInput(title);
  if (description) {
    req.body.description = sanitizeInput(description);
  }

  next();
};

const validateAdmin = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || username.trim().length < 3) {
    return res.status(400).json({ error: "Username must be at least 3 characters" });
  }

  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }

  req.body.username = sanitizeInput(username);
  req.body.email = sanitizeInput(email);

  next();
};

const validateLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  next();
};

module.exports = { validateContent, validateAdmin, validateLogin, sanitizeInput };
