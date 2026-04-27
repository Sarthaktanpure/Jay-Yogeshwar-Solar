const express = require("express");
const multer = require("multer");
const fs = require("fs");
const os = require("os");
const path = require("path");

const { requireAdmin, requireAuth } = require("../middleware/auth");
const { uploadProjectMedia } = require("../services/cloudinaryService");

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
    files: 2,
    fileSize: 50 * 1024 * 1024,
  },
  fileFilter(req, file, callback) {
    if (file.fieldname === "image" && file.mimetype.startsWith("image/")) {
      callback(null, true);
      return;
    }

    if (file.fieldname === "video" && file.mimetype.startsWith("video/")) {
      callback(null, true);
      return;
    }

    callback(new Error("Only image files for image and video files for video are allowed."));
  },
});

function uploadProjectFiles(req, res, next) {
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ])(req, res, (error) => {
    if (!error) {
      next();
      return;
    }

    if (error instanceof multer.MulterError) {
      error.statusCode = error.code === "LIMIT_FILE_SIZE" ? 413 : 400;
      error.message = error.code === "LIMIT_FILE_SIZE"
        ? "Upload exceeds the 50 MB file size limit."
        : error.message;
    } else {
      error.statusCode = error.statusCode || 400;
    }

    next(error);
  });
}

function normalizeProjectPayload(body, media) {
  return {
    title: body.title,
    category: body.category,
    description: body.description || "",
    location: body.location || "",
    farmerName: body.farmerName || "",
    systemType: body.systemType || "",
    capacityKw: Number(body.capacityKw || 0),
    growthValue: Number(body.growthValue || 0),
    status: body.status || "active",
    images: media.images,
    videos: media.videos,
  };
}

function createProjectsRouter({ service }) {
  const router = express.Router();

  router.get("/", async (req, res, next) => {
    try {
      const data = await service.list("projects");
      res.json(data);
    } catch (error) {
      next(error);
    }
  });

  router.post(
    "/",
    requireAuth,
    requireAdmin,
    uploadProjectFiles,
    async (req, res, next) => {
      try {
        if (!req.body.title || !req.body.category) {
          return res.status(400).json({ message: "Missing required field: title or category." });
        }

        const media = await uploadProjectMedia({
          imageFile: req.files?.image?.[0],
          videoFile: req.files?.video?.[0],
        });

        const entry = await service.create("projects", normalizeProjectPayload(req.body, media), "prj");
        return res.status(201).json(entry);
      } catch (error) {
        return next(error);
      }
    },
  );

  router.put("/:id", requireAuth, requireAdmin, async (req, res, next) => {
    try {
      const entry = await service.update("projects", req.params.id, req.body);
      if (!entry) {
        return res.status(404).json({ message: "projects entry not found." });
      }

      return res.json(entry);
    } catch (error) {
      return next(error);
    }
  });

  router.delete("/:id", requireAuth, requireAdmin, async (req, res, next) => {
    try {
      const entry = await service.remove("projects", req.params.id);
      if (!entry) {
        return res.status(404).json({ message: "projects entry not found." });
      }

      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  });

  return router;
}

module.exports = { createProjectsRouter };
