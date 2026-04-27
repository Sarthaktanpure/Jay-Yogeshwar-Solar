const { createApp } = require("./src/app");
const { connectDatabase } = require("./src/config/db");
const { env } = require("./src/config/env");

async function startServer() {
  try {
    const dbState = await connectDatabase();
    const app = createApp({ dbState });
    const server = app.listen(env.port, () => {
      if (!dbState.connected && dbState.reason) {
        console.warn(`Database unavailable. Falling back to ${dbState.mode} mode: ${dbState.reason}`);
      }

      console.log(
        `Jay Yogeshwar Solar API listening on port ${env.port} (${dbState.mode} mode)`,
      );
    });

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(`Port ${env.port} is already in use. Stop the running process or change PORT before starting the API.`);
        process.exit(1);
      }

      console.error("Failed to start server:", error.message);
      process.exit(1);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();
