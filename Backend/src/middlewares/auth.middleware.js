const UserModel = require("../model/user.model");
const ApiError = require("../utils/apiError");
const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    return next(new ApiError(401, "Unauthorized - No token provided"));
  }

  let decode;
  try {
    decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
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
