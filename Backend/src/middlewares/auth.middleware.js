const UserModel = require("../model/user.model");
const ApiError = require("../utils/apiError");
const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    return next(new ApiError(404, "Unauthorized token"));
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // ...use decoded
  } catch (err) {
    // err contains the JWT error (e.g., TokenExpiredError, JsonWebTokenError)
    return next(new ApiError(401, "Invalid or expired token"));
  }

  if (!decode) {
    return next(new ApiError(401, "Unauthorized user"));
  }

  let user = await UserModel.findById(decode.id);

  if (!user) {
    return next(new ApiError(404, "User not found"));
  }

  req.user = user;
  next();
});

module.exports = authMiddleware;
