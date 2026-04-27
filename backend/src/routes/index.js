const express = require("express");
const { createAdminRouter } = require("./admin");
const { createAuthRouter } = require("./auth");
const { createCommentRouter } = require("./comments");
const { createLeadRouter } = require("./leads");
const { createProjectsRouter } = require("./projects");
const { createResourceRouter } = require("./resources");
const { createResourceService } = require("../services/resourceService");

function apiRouter({ dbState }) {
  const router = express.Router();
  const service = createResourceService(dbState);

  router.use("/auth", createAuthRouter(dbState));
  router.use("/admin", createAdminRouter({ dbState }));
  router.use("/comments", createCommentRouter({ dbState }));
  router.use("/projects", createProjectsRouter({ service }));
  router.use("/products", createResourceRouter({
    resourceName: "products",
    requiredFields: ["name", "type", "priceRange"],
    service,
    createPrefix: "prd",
    publicRead: true,
    writeAccess: "admin",
  }));
  router.use("/trends", createResourceRouter({
    resourceName: "trends",
    requiredFields: ["title", "content"],
    service,
    createPrefix: "trd",
    publicRead: true,
    writeAccess: "admin",
  }));
  router.use("/leads", createLeadRouter(service));

  return router;
}

module.exports = { apiRouter };
