const ApiError = require("../utils/apiError");

let errorMiddleware = (err, req, res, next) => {
  // Check for Mongoose validation error
  if (err.name === "ValidationError") {
    err.statusCode = 400;
  }

  // Check for Multer errors
  if (err.code === "LIMIT_FILE_SIZE") {
    err.statusCode = 400;
    err.message = "File size too large. Maximum 5MB allowed.";
  }

  if (err.code === "LIMIT_FILE_COUNT") {
    err.statusCode = 400;
    err.message = "Too many files. Maximum 5 files allowed.";
  }

  if (err.message === "Only image files are allowed") {
    err.statusCode = 400;
  }
  
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
};

module.exports = errorMiddleware;
