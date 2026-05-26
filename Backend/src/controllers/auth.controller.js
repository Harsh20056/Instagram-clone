const UserModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");
const sentMailTo = require("../services/mail.service");

let registerController = asyncHandler(async (req, res, next) => {
  let { username, email, password, name, mobile } = req.body;

  if (!username || !email || !password || !name) {
    return next(new ApiError(400, "All fields are required"));
  }

  let isExisted = await UserModel.findOne({ username });

  if (isExisted) {
    return next(new ApiError(409, "User is already registered with this username"));
  }

  let hashPass = await bcrypt.hash(password, 10);

  let newUser = await UserModel.create({
    name,
    username,
    mobile,
    email,
    password: hashPass,
  });

  let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  res.cookie("token", token);

  return res
    .status(201)
    .json(new ApiResponse("User is registered successfully", newUser));
});

let loginController = asyncHandler(async (req, res, next) => {
  let { username, password } = req.body;

  if (!username || !password) {
    return next(new ApiError(400, "All fields are required"));
  }

  let user = await UserModel.findOne({ username });

  if (!user) {
    return next(new ApiError(404, "User not found"));
  }

  let checkPass = await user.comparePassword(password);

  if (!checkPass) {
    return next(new ApiError(401, "Invalid credentials "));
  }

  let token = await user.generateJWT();

  res.cookie("token", token);

  const loggedInUser = user.toObject();
  delete loggedInUser.password;

  return res
    .status(200)
    .json(new ApiResponse("User logged in successfully", loggedInUser));
});

let updatePasswordController = asyncHandler(async (req, res, next) => {
  let userId = req.params.userId;
  if (!userId) {
    return next(new ApiError(400, "Invalid request"));
  }

  let { password } = req.body;
  if (!password) {
    return next(new ApiError(400, "Invalid request"));
  }

  let hashPass = await bcrypt.hash(password, 10);

  let user = await UserModel.findByIdAndUpdate(
    userId,
    { password: hashPass },
    { new: true },
  );

  return res.status(200).json(new ApiResponse("Password updated successfully"));
});

let forgetPasswordController = asyncHandler(async (req, res, next) => {
  let { email } = req.body;

  if (!email) {
    return next(new ApiError(404, "Email not found"));
  }

  let user = await UserModel.findOne({ email });

  if (!user) {
    return next(new ApiError(404, "User not found with this email"));
  }

  let rawToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "10m",
  });

  let resetLink = `${process.env.BASE_URL}/api/auth/reset-password/${rawToken}`;

  await sentMailTo(
    email,
    "reset password",
    `<a href=\"${resetLink}\">Reset Password</a>`,
  );

  return res.status(200).json(new ApiResponse("Reset link sent"));
});

const resetPasswordController = asyncHandler(async (req, res, next) => {
  let token = req.params.token;

  if (!token) {
    return next(new ApiError(400, "Invalid request"));
  }

  let decode;
  try {
    decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // ...use decoded
  } catch (err) {
    // err contains the JWT error (e.g., TokenExpiredError, JsonWebTokenError)
    return next(new ApiError(401, "Invalid or expired token"));
  }

  if (!decode) {
    return next(new ApiError(401, "Unauthorized request"));
  }
  let user = await UserModel.findById(decode.id);

  if (!user) {
    return next(new ApiError(401, "Unauthorized request"));
  }

  return res.render("reset.ejs", { id: user._id });
});

let changePasswordController = asyncHandler(async (req, res, next) => {
  let userId = req.params.userId;
  let { password } = req.body;
  if (!userId || !password) {
    return next(new ApiError(400, "Invalid request"));
  }
  let hashPass = await bcrypt.hash(password, 10);
  let user = await UserModel.findByIdAndUpdate(
    userId,
    { password: hashPass },
    { new: true },
  );
  if (!user) {
    return next(new ApiError(404, "User not found"));
  }
  return res.status(200).json(new ApiResponse("Password changed successfully"));
});

module.exports = {
  registerController,
  loginController,
  updatePasswordController,
  resetPasswordController,
  forgetPasswordController,
  changePasswordController,
};
