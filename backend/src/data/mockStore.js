const bcrypt = require("bcryptjs");
const { env } = require("../config/env");

const mockStore = {
  users: [],
  products: [
    {
      _id: "prd-1",
      name: "5 HP Solar Pump Combo",
      type: "solar",
      hp: 5,
      kw: 4,
      priceRange: "Rs. 2.2L - 2.8L",
      description: "Best for medium irrigation loads with subsidy-ready sizing.",
      createdAt: new Date().toISOString(),
    },
  ],
  projects: [
    {
      _id: "prj-1",
      title: "Irrigation Pump Installation",
      description: "Hybrid solar pump setup for seasonal farming.",
      category: "pump",
      images: [],
      videos: [],
      location: "Anand, Gujarat",
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
  ],
  trends: [
    {
      _id: "trd-1",
      title: "Subsidy windows should be checked district by district",
      content: "Keep application documents ready early because local approval windows move fast.",
      date: new Date().toISOString(),
      source: "Internal advisory",
      createdAt: new Date().toISOString(),
    },
  ],
  comments: [],
  dailyPosts: [],
  homeShowcases: [],
  leads: [],
};

async function getMockAdmin() {
  return {
    _id: "admin-1",
    name: "Demo Admin",
    email: env.adminEmail,
    role: "admin",
    passwordHash: await bcrypt.hash(env.adminPassword, 10),
  };
}

module.exports = { mockStore, getMockAdmin };
