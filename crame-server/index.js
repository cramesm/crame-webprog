require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

// Using absolute-style paths for Vercel
const personnelRoutes = require(path.join(__dirname, "routes", "personnelRoutes"));
const articleRoutes = require(path.join(__dirname, "routes", "articleRoutes"));

const app = express();

// Database Connection
connectDB();

app.use(express.json());
app.use(cors());

// Health Check
app.get("/", (req, res) => res.send("S.H.I.E.L.D. Server is Operational."));

// Routes
app.use("/api/users", personnelRoutes);
app.use("/api/articles", articleRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

module.exports = app;