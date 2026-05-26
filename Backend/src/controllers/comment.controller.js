const CommentModel = require("../model/comment.model");
const PostModel = require("../model/post.model");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

let createCommentController = asyncHandler(async (req, res, next) => {
  let { postId } = req.params;
  let { comment } = req.body;

  if (!postId || !comment) {
    return next(new ApiError(400, "Post ID and comment are required"));
  }

  let post = await PostModel.findById(postId);

  if (!post) {
    return next(new ApiError(404, "Post not found"));
  }

  let newComment = await CommentModel.create({
    post_id: postId,
    user_id: req.user._id,
    comment,
  });

  // Add comment to post's comments array
  await PostModel.findByIdAndUpdate(
    postId,
    {
      $push: { comments: newComment._id },
    },
    { new: true },
  );

  return res
    .status(201)
    .json(new ApiResponse("Comment added successfully", newComment));
});

let getPostCommentsController = asyncHandler(async (req, res, next) => {
  let { postId } = req.params;

  if (!postId) {
    return next(new ApiError(400, "Post ID is required"));
  }

  let post = await PostModel.findById(postId);

  if (!post) {
    return next(new ApiError(404, "Post not found"));
  }

  let comments = await CommentModel.find({ post_id: postId })
    .populate("user_id", "username name profilePicture")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse("Comments fetched successfully", comments));
});

let updateCommentController = asyncHandler(async (req, res, next) => {
  let { commentId } = req.params;
  let { comment } = req.body;

  if (!commentId || !comment) {
    return next(new ApiError(400, "Comment ID and comment text are required"));
  }

  let existingComment = await CommentModel.findById(commentId);

  if (!existingComment) {
    return next(new ApiError(404, "Comment not found"));
  }

  // Check if user owns the comment
  if (existingComment.user_id.toString() !== req.user._id.toString()) {
    return next(new ApiError(403, "You can only update your own comments"));
  }

  let updatedComment = await CommentModel.findByIdAndUpdate(
    commentId,
    { comment },
    { new: true },
  );

  return res
    .status(200)
    .json(new ApiResponse("Comment updated successfully", updatedComment));
});

let deleteCommentController = asyncHandler(async (req, res, next) => {
  let { commentId } = req.params;

  if (!commentId) {
    return next(new ApiError(400, "Comment ID is required"));
  }

  let comment = await CommentModel.findById(commentId);

  if (!comment) {
    return next(new ApiError(404, "Comment not found"));
  }

  // Check if user owns the comment or is admin
  if (comment.user_id.toString() !== req.user._id.toString()) {
    return next(new ApiError(403, "You can only delete your own comments"));
  }

  // Remove comment from post's comments array
  await PostModel.findByIdAndUpdate(
    comment.post_id,
    {
      $pull: { comments: commentId },
    },
    { new: true },
  );

  await CommentModel.findByIdAndDelete(commentId);

  return res.status(200).json(new ApiResponse("Comment deleted successfully"));
});

module.exports = {
  createCommentController,
  getPostCommentsController,
  updateCommentController,
  deleteCommentController,
};