let errorMiddleware = (err, req, res, next) => {
  // Check for Mongoose validation error
  if (err.name === "ValidationError") {
    err.statusCode = 400;
  }
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
};

module.exports = errorMiddleware;
