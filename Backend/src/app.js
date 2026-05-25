const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const errorMiddleware = require("./middlewares/error.middleware");
const cookieParser = require("cookie-parser");

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser())

// routes
app.use("/api/auth", authRoutes);

// error middleware : always use it in the last
app.use(errorMiddleware);

module.exports = app;
