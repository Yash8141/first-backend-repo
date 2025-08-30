require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;

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
app.listen(process.env.PORT, () => {
  console.log(`Your app is running on port number ${process.env.PORT}`);
});
