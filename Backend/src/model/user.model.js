const { default: mongoose } = require("mongoose");
const jwt= require('jsonwebtoken')
const bcrypt= require("bcrypt")

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

userSchema.pre("save", async function(next){
  if(!this.isModified("password")){
    return next();
  }
   try {
    this.password = await bcrypt.hash(this.password, 10);
    next()
  } catch (error) {
    console.log("error in pre method", error);
    next(error)
  }
})

userSchema.methods.generateJWT=async function(){
  let token =await jwt.sign({id: this.id}, process.env.JWT_SECRET_KEY, {expiresIn : '1h'})
  return token
}


userSchema.methods.comparePassword = async function (password) {
  let checkPass = await bcrypt.compare(password, this.password);
  return checkPass;
};

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
