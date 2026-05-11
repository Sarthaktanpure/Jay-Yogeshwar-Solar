const express = require("express");
const multer = require("multer");
const fs = require("fs");
const os = require("os");
const path = require("path");

const { requireAdmin, requireAuth } = require("../middleware/auth");
const { uploadImageAsset } = require("../services/cloudinaryService");

const uploadDir = path.join(os.tmpdir(), "jay-yogeshwar-solar-uploads");
fs.mkdirSync(uploadDir, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, uploadDir);
    },
    filename(req, file, callback) {
      const extension = path.extname(file.originalname || "");
      callback(null, `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${extension}`);
    },
  }),
  limits: {
    files: 1,
    fileSize: 20 * 1024 * 1024,
  },
  fileFilter(req, file, callback) {
    if (file.fieldname === "image" && file.mimetype.startsWith("image/")) {
      callback(null, true);
      return;
    }

    callback(new Error("Only image files are allowed."));
  },
});

function uploadDailyPostImage(req, res, next) {
  upload.single("image")(req, res, (error) => {
    if (!error) {
      next();
      return;
    }

    if (error instanceof multer.MulterError) {
      error.statusCode = error.code === "LIMIT_FILE_SIZE" ? 413 : 400;
      error.message = error.code === "LIMIT_FILE_SIZE"
        ? "Upload exceeds the 20 MB file size limit."
        : error.message;
    } else {
      error.statusCode = error.statusCode || 400;
    }

    next(error);
  });
}

function normalizeDailyPostPayload(body, image) {
  return {
    title: body.title?.trim() || "Daily update",
    subtitle: body.subtitle?.trim() || "",
    kind: body.kind?.trim() || "notice",
    status: body.status?.trim() || "active",
    publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
    image,
  };
}

function createDailyPostsRouter({ service }) {
  const router = express.Router();

  router.get("/", async (req, res, next) => {
    try {
      const data = await service.list("dailyPosts");
      res.json(data.filter((item) => item.status !== "hidden"));
    } catch (error) {
      next(error);
    }
  });

  router.post("/", requireAuth, requireAdmin, uploadDailyPostImage, async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Image is required." });
      }

      const image = await uploadImageAsset(req.file, "jay-yogeshwar-solar/daily-posts");
      const entry = await service.create("dailyPosts", normalizeDailyPostPayload(req.body, image), "dps");
      return res.status(201).json(entry);
    } catch (error) {
      return next(error);
    }
  });

  router.put("/:id", requireAuth, requireAdmin, async (req, res, next) => {
    try {
      const entry = await service.update("dailyPosts", req.params.id, req.body);
      if (!entry) {
        return res.status(404).json({ message: "dailyPosts entry not found." });
      }

      return res.json(entry);
    } catch (error) {
      return next(error);
    }
  });

  router.delete("/:id", requireAuth, requireAdmin, async (req, res, next) => {
    try {
      const entry = await service.remove("dailyPosts", req.params.id);
      if (!entry) {
        return res.status(404).json({ message: "dailyPosts entry not found." });
      }

      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  });

  return router;
}

module.exports = { createDailyPostsRouter };
