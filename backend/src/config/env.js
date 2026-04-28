const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const candidateEnvPaths = [
  path.resolve(process.cwd(), ".env"),
  path.resolve(__dirname, "..", "..", ".env"),
];

const resolvedEnvPath = candidateEnvPaths.find((candidatePath) => fs.existsSync(candidatePath));

if (resolvedEnvPath) {
  dotenv.config({ path: resolvedEnvPath });
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

function withDevelopmentOrigins(origins, nodeEnv) {
  if (nodeEnv === "production") {
    return origins;
  }

  const devOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:4173",
    "http://127.0.0.1:4173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ];

  return devOrigins.reduce((allOrigins, origin) => {
    if (!allOrigins.includes(origin)) {
      allOrigins.push(origin);
    }

    return allOrigins;
  }, [...origins]);
}

const frontendUrl = process.env.FRONTEND_URL || "https://jay-yogeshwar-solar.vercel.app";
const nodeEnv = process.env.NODE_ENV || "development";

const env = {
  nodeEnv,
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGO_URI || "",
  requireDatabase: parseBoolean(process.env.REQUIRE_DATABASE, nodeEnv === "production"),
  jwtSecret: process.env.JWT_SECRET || "change-me-before-production",
  allowedOrigins: withDevelopmentOrigins(withFallbackOrigin(parseCsv(process.env.ALLOWED_ORIGINS), frontendUrl), nodeEnv),
  allowedAdminEmails: parseCsv(process.env.ALLOWED_ADMIN_EMAILS || "yogeshmhase08@gmail.com,sarthaktanpure255@gmail.com"),
  adminEmail: process.env.ADMIN_EMAIL || "admin@jayyogeshwarsolar.local",
  adminPassword: process.env.ADMIN_PASSWORD || "ChangeMe123!",
  frontendUrl,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || "",
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || "",
};

module.exports = { env };
