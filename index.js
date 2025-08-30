require("dotenv").config();

const express = require("express");
const app = express();

// Add middleware for better performance
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add a simple middleware to log requests (helps with debugging)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint for Render
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/twitter", (req, res) => {
  res.send("Yash Solanki");
});

app.get("/login", (req, res) => {
  res.send("<h1>Please login at chai aur code</h1>");
});

app.get("/youtube", (req, res) => {
  res.send("<h2>Chai aur code</h2>");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// 404 handler
app.use((req, res) => {
  res.status(404).send("Route not found");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Your app is running on port number ${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/health`);
});
