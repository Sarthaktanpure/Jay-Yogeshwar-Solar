const jwt = require("jsonwebtoken");
const { env } = require("../config/env");

function isAllowedAdminEmail(email = "") {
  return env.allowedAdminEmails.includes(String(email).toLowerCase());
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication required." });
  }

  const token = header.slice(7);

  try {
    req.user = jwt.verify(token, env.jwtSecret);
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}

function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication required." });
  }

  if (req.user.role !== "admin" || !isAllowedAdminEmail(req.user.email)) {
    return res.status(403).json({ message: "Admin access required." });
  }

  return next();
}

module.exports = { requireAuth, requireAdmin, isAllowedAdminEmail };
