const express = require("express");
const rateLimit = require("express-rate-limit");

const { mockStore } = require("../data/mockStore");
const { Comment } = require("../models");
const { requireAdmin, requireAuth } = require("../middleware/auth");
const { validateRequiredFields } = require("../middleware/validate");

function createCommentRouter({ dbState }) {
  const router = express.Router();

  router.get("/", async (req, res, next) => {
    try {
      const projectId = req.query.projectId;

      if (dbState.connected) {
        const filter = projectId ? { projectId } : {};
        const comments = await Comment.find(filter).sort({ createdAt: -1 }).lean();
        return res.json(comments);
      }

      const comments = projectId
        ? mockStore.comments.filter((item) => item.projectId === projectId)
        : mockStore.comments;

      return res.json(
        [...comments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      );
    } catch (error) {
      return next(error);
    }
  });

  router.post(
    "/",
    requireAuth,
    rateLimit({
      windowMs: 10 * 60 * 1000,
      max: 30,
      standardHeaders: true,
      legacyHeaders: false,
      message: { message: "Too many comments posted. Please try again shortly." },
    }),
    validateRequiredFields(["projectId", "text"]),
    async (req, res, next) => {
      try {
        const payload = {
          projectId: String(req.body.projectId),
          text: String(req.body.text).trim(),
          userId: req.user.sub,
          userName: req.user.name,
          userEmail: req.user.email,
        };

        if (!payload.text) {
          return res.status(400).json({ message: "Comment text is required." });
        }

        if (dbState.connected) {
          const comment = await Comment.create(payload);
          return res.status(201).json(comment.toObject());
        }

        const comment = {
          _id: `cmt-${Math.random().toString(36).slice(2, 10)}`,
          ...payload,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        mockStore.comments.unshift(comment);
        return res.status(201).json(comment);
      } catch (error) {
        return next(error);
      }
    },
  );

  router.delete("/:id", requireAuth, requireAdmin, async (req, res, next) => {
    try {
      if (dbState.connected) {
        const removed = await Comment.findByIdAndDelete(req.params.id).lean();
        if (!removed) {
          return res.status(404).json({ message: "Comment not found." });
        }

        return res.status(204).send();
      }

      const index = mockStore.comments.findIndex((item) => item._id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ message: "Comment not found." });
      }

      mockStore.comments.splice(index, 1);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  });

  return router;
}

module.exports = { createCommentRouter };
