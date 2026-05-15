require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const personnelRoutes = require("./routes/personnelRoutes");
const articleRoutes = require("./routes/articleRoutes");

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