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

// CORS configuration for frontend - support multiple origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://instagram-clone-pi-roan.vercel.app",
  // Add your production Vercel URL from environment variable
  process.env.FRONTEND_URL,
].filter(Boolean); // Remove undefined values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if the origin matches any allowed origin or is a Vercel preview deployment
    const isAllowed = allowedOrigins.some(allowedOrigin => origin === allowedOrigin) ||
                      origin.includes('.vercel.app'); // Allow all Vercel preview deployments
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie'],
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
