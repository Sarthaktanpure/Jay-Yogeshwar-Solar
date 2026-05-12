const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const { env } = require("./config/env");
const { apiRouter } = require("./routes");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandlers");

function createCorsOptions() {
  if (!env.allowedOrigins.length) {
    return { origin: true, credentials: true };
  }

  return {
    origin(origin, callback) {
      if (
        !origin ||
        env.allowedOrigins.includes(origin) ||
        env.allowedOrigins.includes(origin + "/") ||
        (origin.startsWith("https://jay-yogeshwar-solar") &&
          origin.endsWith(".vercel.app"))
      ) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
  };
}

function createApp({ dbState }) {
  const app = express();

  app.disable("x-powered-by");
  app.set("trust proxy", 1);

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
    }),
  );
  app.use(cors(createCorsOptions()));
  app.use(express.json({ limit: "200kb" }));
  app.use(express.urlencoded({ extended: true, limit: "50kb" }));
  app.use(
    morgan(env.nodeEnv === "production" ? "combined" : "dev", {
      skip: () => env.nodeEnv === "test",
    }),
  );
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 400,
      standardHeaders: true,
      legacyHeaders: false,
      message: {
        message: "Too many requests from this IP. Please try again shortly.",
      },
    }),
  );
  app.get("/", (req, res) => {
    res.json({ app: "Jay Yogeshwar Solar API" });
  });
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      app: "Jay Yogeshwar Solar API",
      timestamp: new Date().toISOString(),
      databaseMode: dbState.mode,
    });
  });

  app.get(
  "/loaderio-d73b01efbc5cf59751cba803d476478f.txt",
  (req, res) => {
    res.send("loaderio-d73b01efbc5cf59751cba803d476478f");
  }
);

  app.use("/api", apiRouter({ dbState }));

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
