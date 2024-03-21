const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

const bookRoutes = require("./routes/book");

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

app.use("/api/books", bookRoutes);

module.exports = app;
