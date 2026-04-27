function notFoundHandler(req, res) {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
}

function errorHandler(error, req, res, next) {
  const status = error.statusCode || 500;
  const response = {
    message: error.message || "Internal server error",
  };

  if (process.env.NODE_ENV !== "production" && error.details) {
    response.details = error.details;
  }

  if (process.env.NODE_ENV !== "production" && error.stack) {
    response.stack = error.stack;
  }

  res.status(status).json(response);
}

module.exports = { notFoundHandler, errorHandler };
