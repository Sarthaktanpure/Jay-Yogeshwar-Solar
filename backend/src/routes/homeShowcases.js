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

function uploadShowcaseImage(req, res, next) {
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

function normalizeShowcasePayload(body, image) {
  return {
    title: body.title?.trim() || "Solar installation",
    subtitle: body.subtitle?.trim() || "",
    status: body.status?.trim() || "active",
    image,
  };
}

function createHomeShowcasesRouter({ service }) {
  const router = express.Router();

  router.get("/", async (req, res, next) => {
    try {
      const data = await service.list("homeShowcases");
      res.json(data.filter((item) => item.status !== "hidden"));
    } catch (error) {
      next(error);
    }
  });

  router.post("/", requireAuth, requireAdmin, uploadShowcaseImage, async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Image is required." });
      }

      const image = await uploadImageAsset(req.file, "jay-yogeshwar-solar/home-showcases");
      const entry = await service.create("homeShowcases", normalizeShowcasePayload(req.body, image), "hms");
      return res.status(201).json(entry);
    } catch (error) {
      return next(error);
    }
  });

  router.put("/:id", requireAuth, requireAdmin, async (req, res, next) => {
    try {
      const entry = await service.update("homeShowcases", req.params.id, req.body);
      if (!entry) {
        return res.status(404).json({ message: "homeShowcases entry not found." });
      }

      return res.json(entry);
    } catch (error) {
      return next(error);
    }
  });

  router.delete("/:id", requireAuth, requireAdmin, async (req, res, next) => {
    try {
      const entry = await service.remove("homeShowcases", req.params.id);
      if (!entry) {
        return res.status(404).json({ message: "homeShowcases entry not found." });
      }

      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  });

  return router;
}

module.exports = { createHomeShowcasesRouter };
