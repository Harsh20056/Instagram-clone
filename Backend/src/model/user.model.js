const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true, // remove the accidental space before or after the username
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    mobile: {
      type: String,
      trim: true,
      minlength: 10,
      maxlength: 10,
      // we are not using required : true here because instagram works without mobile number
    },
    passwork: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
    },
    refreshToken: String,
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId, // Types is used for the collection of special MongoDB database types
        ref: "users",
      },
    ],
    followings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
