const express = require("express");
const app = express();

app.use(express.json());

// Route Imports
const textRoutes = require("./routes/textRoutes");

app.use("", textRoutes);

module.exports = app;