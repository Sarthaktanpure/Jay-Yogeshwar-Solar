const express = require("express");

const { mockStore } = require("../data/mockStore");
const models = require("../models");
const { requireAuth, requireAdmin } = require("../middleware/auth");

function percentageChange(current, previous) {
  if (!previous && !current) {
    return 0;
  }

  if (!previous) {
    return 100;
  }

  return Math.round(((current - previous) / previous) * 100);
}

function splitByWindow(items) {
  const now = Date.now();
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;
  let current = 0;
  let previous = 0;

  items.forEach((item) => {
    const createdAt = new Date(item.createdAt || item.date || now).getTime();
    if (createdAt >= now - thirtyDays) {
      current += 1;
    } else if (createdAt >= now - (thirtyDays * 2)) {
      previous += 1;
    }
  });

  return { current, previous };
}

function createAdminRouter({ dbState }) {
  const router = express.Router();

  router.get("/overview", requireAuth, requireAdmin, async (req, res, next) => {
    try {
      let users;
      let projects;
      let trends;
      let comments;
      let leads;

      if (dbState.connected) {
        [users, projects, trends, comments, leads] = await Promise.all([
          models.User.find().sort({ createdAt: -1 }).lean(),
          models.Project.find().sort({ createdAt: -1 }).lean(),
          models.Trend.find().sort({ createdAt: -1 }).lean(),
          models.Comment.find().sort({ createdAt: -1 }).lean(),
          models.Lead.find().sort({ createdAt: -1 }).lean(),
        ]);
      } else {
        users = [...mockStore.users];
        projects = [...mockStore.projects];
        trends = [...mockStore.trends];
        comments = [...mockStore.comments];
        leads = [...mockStore.leads];
      }

      const leadWindow = splitByWindow(leads);
      const projectWindow = splitByWindow(projects);
      const marketGrowth = percentageChange(
        leadWindow.current + projectWindow.current,
        leadWindow.previous + projectWindow.previous,
      );

      return res.json({
        metrics: {
          totalUsers: users.length,
          totalProjects: projects.length,
          totalComments: comments.length,
          totalLeads: leads.length,
          totalTrends: trends.length,
          marketGrowth,
        },
        recentProjects: projects.slice(0, 5),
        recentComments: comments.slice(0, 8),
        recentLeads: leads.slice(0, 8),
      });
    } catch (error) {
      return next(error);
    }
  });

  return router;
}

module.exports = { createAdminRouter };
