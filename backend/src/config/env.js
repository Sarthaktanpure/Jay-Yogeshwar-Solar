const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const envPath = path.resolve(process.cwd(), ".env");

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

function parseCsv(value) {
  return (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseBoolean(value, fallback = false) {
  if (typeof value === "undefined") {
    return fallback;
  }

  return ["1", "true", "yes", "on"].includes(String(value).trim().toLowerCase());
}

function withFallbackOrigin(origins, fallbackOrigin) {
  const normalizedOrigins = [...origins];
  const normalizedFallback = String(fallbackOrigin || "").trim().replace(/\/+$/, "");

  if (normalizedFallback && !normalizedOrigins.includes(normalizedFallback)) {
    normalizedOrigins.push(normalizedFallback);
  }

  return normalizedOrigins;
}

const frontendUrl = process.env.FRONTEND_URL || "https://jay-yogeshwar-solar.vercel.app";

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGO_URI || "",
  requireDatabase: parseBoolean(process.env.REQUIRE_DATABASE, process.env.NODE_ENV === "production"),
  jwtSecret: process.env.JWT_SECRET || "change-me-before-production",
  allowedOrigins: withFallbackOrigin(parseCsv(process.env.ALLOWED_ORIGINS), frontendUrl),
  allowedAdminEmails: parseCsv(process.env.ALLOWED_ADMIN_EMAILS || "yogeshmhase08@gmail.com,sarthaktanpure255@gmail.com"),
  adminEmail: process.env.ADMIN_EMAIL || "admin@jayyogeshwarsolar.local",
  adminPassword: process.env.ADMIN_PASSWORD || "ChangeMe123!",
  frontendUrl,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || "",
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || "",
};

module.exports = { env };
