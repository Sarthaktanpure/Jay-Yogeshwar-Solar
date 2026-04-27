const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");

const { env } = require("../config/env");
const { getMockAdmin } = require("../data/mockStore");
const { mockStore } = require("../data/mockStore");
const { AdminUser, User } = require("../models");
const { validateRequiredFields } = require("../middleware/validate");
const { isAllowedAdminEmail, requireAuth } = require("../middleware/auth");

function createToken(user) {
  return jwt.sign(
    {
      sub: user._id,
      name: user.name,
      email: user.email,
      role: user.role || "user",
    },
    env.jwtSecret,
    { expiresIn: "12h" },
  );
}

function sanitizeUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role || "user",
  };
}

function createAuthRouter(dbState) {
  const router = express.Router();

  router.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 10,
      standardHeaders: true,
      legacyHeaders: false,
      message: { message: "Too many login attempts. Please wait and try again." },
    }),
  );

  router.post("/register", validateRequiredFields(["name", "email", "password"]), async (req, res, next) => {
    try {
      const email = req.body.email.toLowerCase();
      const role = isAllowedAdminEmail(email) ? "admin" : "user";

      if (dbState.connected) {
        const existingUser = await User.findOne({ email }).lean();
        if (existingUser) {
          return res.status(409).json({ message: "An account with this email already exists." });
        }

        const user = await User.create({
          name: req.body.name,
          email,
          password: req.body.password,
          role,
        });

        return res.status(201).json({
          token: createToken(user),
          user: sanitizeUser(user),
        });
      }

      const existsInMock = mockStore.users.some((user) => user.email === email);
      const mockAdmin = await getMockAdmin();
      if (existsInMock || mockAdmin.email === email) {
        return res.status(409).json({ message: "An account with this email already exists." });
      }

      const user = {
        _id: `usr-${Math.random().toString(36).slice(2, 10)}`,
        name: req.body.name,
        email,
        role,
        passwordHash: await bcrypt.hash(req.body.password, 10),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockStore.users.unshift(user);

      return res.status(201).json({
        token: createToken(user),
        user: sanitizeUser(user),
      });
    } catch (error) {
      return next(error);
    }
  });

  router.post("/login", validateRequiredFields(["email", "password"]), async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const normalizedEmail = email.toLowerCase();
      let authUser;
      let passwordHash;

      if (dbState.connected) {
        authUser = await User.findOne({ email: normalizedEmail }).select("+password");
        passwordHash = authUser?.password;

        if (!authUser) {
          authUser = await AdminUser.findOne({ email: normalizedEmail }).select("+password");
          passwordHash = authUser?.password;
        }
      } else {
        const mockAdmin = await getMockAdmin();
        const mockUser = mockStore.users.find((user) => user.email === normalizedEmail);
        if (mockUser) {
          authUser = mockUser;
          passwordHash = mockUser.passwordHash;
        } else if (mockAdmin.email === normalizedEmail) {
          authUser = mockAdmin;
          passwordHash = mockAdmin.passwordHash;
        }
      }

      const passwordMatches = passwordHash ? await bcrypt.compare(password, passwordHash) : false;
      if (!authUser || !passwordMatches) {
        return res.status(401).json({ message: "Invalid email or password." });
      }

      const normalizedUser = authUser.toObject ? authUser.toObject() : authUser;
      if (isAllowedAdminEmail(normalizedUser.email)) {
        normalizedUser.role = "admin";
      }

      return res.json({
        token: createToken(normalizedUser),
        user: sanitizeUser(normalizedUser),
      });
    } catch (error) {
      return next(error);
    }
  });

  router.get("/me", requireAuth, async (req, res) => {
    return res.json({
      user: {
        id: req.user.sub,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });
  });

  return router;
}

module.exports = { createAuthRouter };
