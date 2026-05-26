const PostModel = require("../model/post.model");
const UserModel = require("../model/user.model");
const sendToIK = require("../services/storage.service");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

let createPostController = asyncHandler(async (req, res, next) => {
  let { caption } = req.body;

  let images = req.files;

  // Check if files were uploaded (multer middleware handles validation)
  if (!images || images.length === 0) {
    return next(new ApiError(400, "At least one image is required"));
  }

  // Validate image count (1-5 images)
  if (images.length > 5) {
    return next(new ApiError(400, "Maximum 5 images allowed"));
  }

  try {
    let uploadedImages = await Promise.all(
      images.map(async (elem) => {
        return await sendToIK(elem.buffer, elem.originalname);
      }),
    );

    let newPost = await PostModel.create({
      user_id: req.user._id,
      caption,
      imageUrl: uploadedImages.map((elem) => elem.url),
    });

    // Add post to user's posts array
    await UserModel.findByIdAndUpdate(
      req.user._id,
      {
        $push: { posts: newPost._id },
      },
      { new: true },
    );

    return res
      .status(201)
      .json(new ApiResponse("Post created successfully", newPost));
  } catch (error) {
    // Handle storage service errors
    return next(new ApiError(500, "Failed to upload images: " + error.message));
  }
});

let getAllPostController = asyncHandler(async (req, res, next) => {
  let allPosts = await PostModel.find().populate("likes");

  return res
    .status(200)
    .json(new ApiResponse("Posts fetched successfully", allPosts));
});

let getSinglePostController = asyncHandler(async (req, res, next) => {
  let postId = req.params.postId;

  let post = await PostModel.findById(postId);

  if (!post) {
    return next(new ApiError(404, "Post not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse("Post fetched successfully", post));
});

let likesController = asyncHandler(async (req, res, next) => {
  let postId = req.params.postId;

  if (!postId) {
    return next(new ApiError(404, "Post id not found"));
  }

  let post = await PostModel.findById(postId);

  if (!post) {
    return next(new ApiError(404, "Post not found"));
  }

  if (post.likes.includes(req.user._id)) {
    await PostModel.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: req.user._id },
      },
      {
        new: true,
      },
    );
  } else {
    await PostModel.findByIdAndUpdate(
      postId,
      {
        $push: { likes: req.user._id },
      },
      {
        new: true,
      },
    );
  }

  return res.status(200).json(new ApiResponse("Like updated successfully"));
});

module.exports = {
  createPostController,
  getAllPostController,
  likesController,
  getSinglePostController,
};
