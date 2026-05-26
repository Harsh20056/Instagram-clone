let express = require("express");
const {
  createCommentController,
  getPostCommentsController,
  updateCommentController,
  deleteCommentController,
} = require("../controllers/comment.controller");

const authMiddleware = require("../middlewares/auth.middleware");

let router = express.Router();

// Post-specific comment routes
router.post("/post/:postId", authMiddleware, createCommentController);
router.get("/post/:postId", getPostCommentsController);

// Comment-specific routes (update/delete)
router.put("/:commentId", authMiddleware, updateCommentController);
router.delete("/:commentId", authMiddleware, deleteCommentController);

module.exports = router;