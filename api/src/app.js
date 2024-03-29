const dotenv = require("dotenv");
const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const path = require("path");

const bookRoutes = require("./routes/book");
const userRoutes = require("./routes/user");

const app = express();
app.use(express.json());

dotenv.config();

// Initialization of the connection to database
mongoose
  .connect(process.env["DATABASE_URI"], {
    dbName: process.env["DATABASE_NAME"],
  })
  .then(() => console.log("Connected to the database with success"))
  .catch((error) => {
    console.log(`Connection to the database failed: ${error}`);
  });

// Enable CORS (Cross Origin Resource Sharing) so that the client can call directly the API
app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

/* Create the "/images" folder (storing images uploaded by users)
 * and bind the "/images" route with this folder
 */
const imagesFolderPath = path.join(__dirname, "images");
fs.access(imagesFolderPath, (error) => {
  if (error) {
    fs.mkdirSync(imagesFolderPath);
  }
});
app.use("/images", express.static(imagesFolderPath));

app.use("/api/auth", userRoutes);
app.use("/api/books", bookRoutes);

module.exports = app;
