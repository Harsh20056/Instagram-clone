const { default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const CommentModel = mongoose.model("comments", commentSchema);

module.exports = CommentModel;
