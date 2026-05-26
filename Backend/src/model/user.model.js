const { default: mongoose } = require("mongoose");
const jwt= require('jsonwebtoken')
const bcrypt= require("bcrypt");
const ApiError = require("../utils/apiError");

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
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
    },
    profilePicture: {
      type: String,
      default: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+CiAgPGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSIxMDAiIGZpbGw9IiNlNWU3ZWIiLz4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSI3NSIgcj0iMzUiIGZpbGw9IiM5Y2EzYWYiLz4KICA8ZWxsaXBzZSBjeD0iMTAwIiBjeT0iMTYwIiByeD0iNjAiIHJ5PSI0MCIgZmlsbD0iIzljYTNhZiIvPgo8L3N2Zz4=",
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

userSchema.pre("save", async function(){
  if(!this.isModified("password")){
    return 
  }
   try {
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    console.log("error in pre method", error);
    throw new ApiError(400, error.message)
  }
})

userSchema.methods.generateJWT=async function(){
  let token = jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {expiresIn : '1h'})
  return token
}


userSchema.methods.comparePassword = async function (password) {
  let checkPass = await bcrypt.compare(password, this.password);
  return checkPass;
};

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
