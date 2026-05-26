let express = require("express");
const {
  followUnfollowController,
  getUserProfileController,
  updateUserProfileController,
  getUserPostsController,
  searchUsersController,
  getSuggestedUsersController,
  getUserFollowersController,
  getUserFollowingsController,
} = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../config/multer");

let router = express.Router();

// Follow/Unfollow user
router.get("/follow/:followerId", authMiddleware, followUnfollowController);

// Get user profile (public - no auth required for others' profiles)
router.get("/profile", authMiddleware, getUserProfileController); // Current user profile
router.get("/profile/:userId", getUserProfileController); // Other user's profile

// Update user profile (requires auth) - with optional profile picture upload
router.put("/profile", authMiddleware, upload.single("profilePicture"), updateUserProfileController);

// Get user's posts
router.get("/posts", authMiddleware, getUserPostsController); // Current user's posts
router.get("/posts/:userId", getUserPostsController); // Other user's posts

// Search users
router.get("/search", searchUsersController);

// Get suggested users to follow
router.get("/suggested", authMiddleware, getSuggestedUsersController);

// Get user's followers list
router.get("/followers", authMiddleware, getUserFollowersController); // Current user's followers
router.get("/followers/:userId", getUserFollowersController); // Other user's followers

// Get user's followings list
router.get("/followings", authMiddleware, getUserFollowingsController); // Current user's followings
router.get("/followings/:userId", getUserFollowingsController); // Other user's followings

module.exports = router;