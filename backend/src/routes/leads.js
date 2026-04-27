const express = require("express");
const rateLimit = require("express-rate-limit");

const { requireAdmin, requireAuth } = require("../middleware/auth");
const { validateRequiredFields } = require("../middleware/validate");

function createLeadRouter(service) {
  const router = express.Router();

  router.post(
    "/",
    rateLimit({
      windowMs: 10 * 60 * 1000,
      max: 20,
      standardHeaders: true,
      legacyHeaders: false,
      message: { message: "Too many form submissions. Please try again shortly." },
    }),
    validateRequiredFields(["name", "phone", "requirement"]),
    async (req, res, next) => {
      try {
        const lead = await service.create("leads", { ...req.body, status: "new" }, "lead");
        res.status(201).json(lead);
      } catch (error) {
        next(error);
      }
    },
  );

  router.get("/", requireAuth, requireAdmin, async (req, res, next) => {
    try {
      const leads = await service.list("leads");
      res.json(leads);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = { createLeadRouter };
