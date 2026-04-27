const mongoose = require("mongoose");
const { env } = require("./env");

async function connectDatabase() {
  if (!env.mongoUri) {
    if (env.requireDatabase) {
      throw new Error("MONGO_URI is required when REQUIRE_DATABASE is enabled.");
    }

    return { connected: false, mode: "mock", reason: "MONGO_URI not configured" };
  }

  try {
    await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 20,
    });
  } catch (error) {
    if (env.requireDatabase) {
      throw error;
    }

    return { connected: false, mode: "mock", reason: error.message };
  }

  return { connected: true, mode: "mongodb" };
}

module.exports = { connectDatabase };
