const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database is connected");
  } catch (error) {
    console.log("Error in database : ", error);
  }
};

module.exports = connectDB;
