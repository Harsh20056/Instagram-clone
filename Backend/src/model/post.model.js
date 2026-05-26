const { default: mongoose } = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    caption: {
      type: String,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const PostModel = mongoose.model("posts", postSchema);

module.exports = PostModel;
