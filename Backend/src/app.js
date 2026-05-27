const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const userRoutes = require("./routes/user.routes");
const commentRoutes = require("./routes/comment.routes");
const errorMiddleware = require("./middlewares/error.middleware");
const cookieParser = require("cookie-parser");
const path = require("path");

connectDB();

const app = express();

// CORS configuration for frontend
app.use(cors({
  origin: `${process.env.FRONTEND_URL}`, // Frontend URL
  credentials: true
}));

// path.join is used to join the path 
// express.static tells the express that all static files in the public folder
app.use(express.static(path.join(__dirname, "../public"))); // here we will write ../public since _dirname will contain /src in the path but our pubilc folder is not in src
app.set("view engine", "ejs");

app.use(express.json()); // Middleware to read JSON data sent in request body
app.use(cookieParser()); // Middleware to read cookies from the browser // Cookies become available inside req.cookies
app.use(express.urlencoded({ extended: true })); // Middleware to read form data sent from HTML forms // extended: true allows nested objects in form data

// routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);

// error middleware : always use it in the last
app.use(errorMiddleware);

module.exports = app;
