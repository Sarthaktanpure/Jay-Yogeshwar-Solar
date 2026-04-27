const express = require("express");
const { requireAdmin, requireAuth } = require("../middleware/auth");

function createResourceRouter({
  resourceName,
  requiredFields,
  service,
  createPrefix,
  publicRead = true,
  writeAccess = "admin",
}) {
  const router = express.Router();
  const writeGuard = writeAccess === "auth" ? requireAuth : [requireAuth, requireAdmin];

  if (publicRead) {
    router.get("/", async (req, res, next) => {
      try {
        const data = await service.list(resourceName);
        res.json(data);
      } catch (error) {
        next(error);
      }
    });
  } else {
    router.get("/", requireAuth, async (req, res, next) => {
      try {
        const data = await service.list(resourceName);
        res.json(data);
      } catch (error) {
        next(error);
      }
    });
  }

  router.post("/", writeGuard, async (req, res, next) => {
    try {
      for (const field of requiredFields) {
        if (!req.body[field]) {
          return res.status(400).json({ message: `Missing required field: ${field}` });
        }
      }

      const entry = await service.create(resourceName, req.body, createPrefix);
      return res.status(201).json(entry);
    } catch (error) {
      return next(error);
    }
  });

  router.put("/:id", writeGuard, async (req, res, next) => {
    try {
      const entry = await service.update(resourceName, req.params.id, req.body);
      if (!entry) {
        return res.status(404).json({ message: `${resourceName} entry not found.` });
      }

      return res.json(entry);
    } catch (error) {
      return next(error);
    }
  });

  router.delete("/:id", writeGuard, async (req, res, next) => {
    try {
      const entry = await service.remove(resourceName, req.params.id);
      if (!entry) {
        return res.status(404).json({ message: `${resourceName} entry not found.` });
      }

      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  });

  return router;
}

module.exports = { createResourceRouter };
