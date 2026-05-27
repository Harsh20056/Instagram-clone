const UserModel = require("../model/user.model");
const PostModel = require("../model/post.model");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

let followUnfollowController = asyncHandler(async (req, res, next) => {
  let targetUserId = req.params.followerId;
  let currentUserId = req.user._id;

  if (!targetUserId) {
    return next(new ApiError(400, "Target user ID is required"));
  }

  if (targetUserId.toString() === currentUserId.toString()) {
    return next(new ApiError(400, "You cannot follow yourself"));
  }

  let targetUser = await UserModel.findById(targetUserId);
  let currentUser = await UserModel.findById(currentUserId);

  if (!targetUser || !currentUser) {
    return next(new ApiError(404, "User not found"));
  }

  const isFollowing = targetUser.followers.includes(currentUserId);

  let updatedTargetUser;
  if (isFollowing) {
    // Unfollow: Remove from target user's followers and current user's followings
    await Promise.all([
      UserModel.findByIdAndUpdate(targetUserId, {
        $pull: { followers: currentUserId },
      }),
      UserModel.findByIdAndUpdate(currentUserId, {
        $pull: { followings: targetUserId },
      }),
    ]);
    updatedTargetUser = await UserModel.findById(targetUserId);
  } else {
    // Follow: Add to target user's followers and current user's followings
    await Promise.all([
      UserModel.findByIdAndUpdate(targetUserId, {
        $push: { followers: currentUserId },
      }),
      UserModel.findByIdAndUpdate(currentUserId, {
        $push: { followings: targetUserId },
      }),
    ]);
    updatedTargetUser = await UserModel.findById(targetUserId);
  }

  return res.status(200).json(new ApiResponse(
    isFollowing ? "Unfollowed successfully" : "Followed successfully",
    updatedTargetUser
  ));
});

let getUserProfileController = asyncHandler(async (req, res, next) => {
  let { userId } = req.params;

  if (!userId) {
    // If no userId provided, return current user's profile
    userId = req.user._id;
  }

  let user = await UserModel.findById(userId)
    .select("-password -refreshToken")
    .populate("followers", "username name")
    .populate("followings", "username name");

  if (!user) {
    return next(new ApiError(404, "User not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse("User profile fetched successfully", user));
});

let updateUserProfileController = asyncHandler(async (req, res, next) => {
  let { name, email, mobile, username } = req.body;
  let userId = req.user._id;

  let updateData = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (mobile) updateData.mobile = mobile;
  if (username) updateData.username = username;

  // Handle profile picture upload if file is provided
  if (req.file) {
    const sendToIK = require("../services/storage.service");
    try {
      const uploadedImage = await sendToIK(req.file.buffer, req.file.originalname);
      updateData.profilePicture = uploadedImage.url;
    } catch (error) {
      return next(new ApiError(500, "Failed to upload profile picture: " + error.message));
    }
  }

  if (Object.keys(updateData).length === 0) {
    return next(new ApiError(400, "No data provided for update"));
  }

  // Check if username is already taken by another user
  if (username) {
    let existingUser = await UserModel.findOne({
      username,
      _id: { $ne: userId },
    });
    if (existingUser) {
      return next(new ApiError(409, "Username already taken"));
    }
  }

  // Check if email is already taken by another user
  if (email) {
    let existingUser = await UserModel.findOne({
      email,
      _id: { $ne: userId },
    });
    if (existingUser) {
      return next(new ApiError(409, "Email already taken"));
    }
  }

  let updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    updateData,
    { new: true },
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse("Profile updated successfully", updatedUser));
});

let getUserPostsController = asyncHandler(async (req, res, next) => {
  let { userId } = req.params;

  if (!userId) {
    userId = req.user._id;
  }

  let user = await UserModel.findById(userId);
  if (!user) {
    return next(new ApiError(404, "User not found"));
  }

  let posts = await PostModel.find({ user_id: userId })
    .populate("user_id", "username name profilePicture")
    .populate("likes")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse("User posts fetched successfully", posts));
});

let searchUsersController = asyncHandler(async (req, res, next) => {
  let { query } = req.query;

  if (!query || query.trim().length < 2) {
    return next(new ApiError(400, "Search query must be at least 2 characters"));
  }

  let users = await UserModel.find({
    $or: [
      { username: { $regex: query, $options: "i" } },
      { name: { $regex: query, $options: "i" } },
    ],
  })
    .select("username name profilePicture followers followings")
    .limit(20);

  return res
    .status(200)
    .json(new ApiResponse("Users found successfully", users));
});

let getSuggestedUsersController = asyncHandler(async (req, res, next) => {
  let currentUserId = req.user._id;
  let currentUser = await UserModel.findById(currentUserId);

  // Get users not followed by current user, excluding current user
  let suggestedUsers = await UserModel.find({
    _id: { $ne: currentUserId, $nin: currentUser.followings },
  })
    .select("username name profilePicture followers followings")
    .limit(10)
    .sort({ followers: -1 }); // Sort by most followers first

  return res
    .status(200)
    .json(new ApiResponse("Suggested users fetched successfully", suggestedUsers));
});

let getUserFollowersController = asyncHandler(async (req, res, next) => {
  let { userId } = req.params;

  if (!userId) {
    userId = req.user._id;
  }

  let user = await UserModel.findById(userId).populate({
    path: "followers",
    select: "username name profilePicture",
  });

  if (!user) {
    return next(new ApiError(404, "User not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse("Followers fetched successfully", user.followers));
});

let getUserFollowingsController = asyncHandler(async (req, res, next) => {
  let { userId } = req.params;

  if (!userId) {
    userId = req.user._id;
  }

  let user = await UserModel.findById(userId).populate({
    path: "followings",
    select: "username name profilePicture",
  });

  if (!user) {
    return next(new ApiError(404, "User not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse("Followings fetched successfully", user.followings));
});

module.exports = {
  followUnfollowController,
  getUserProfileController,
  updateUserProfileController,
  getUserPostsController,
  searchUsersController,
  getSuggestedUsersController,
  getUserFollowersController,
  getUserFollowingsController,
};