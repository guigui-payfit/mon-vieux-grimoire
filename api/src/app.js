const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

const Book = require("./models/book");

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

app.delete("/api/books/:id", async (req, res, _) => {
  try {
    await Book.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Livre supprimé !" });
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.get("/api/books", async (_, res, __) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.get("/api/books/:id", async (req, res, _) => {
  try {
    const book = await Book.findOne({ _id: req.params.id });
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ error });
  }
});

app.post("/api/books", async (req, res, _) => {
  try {
    delete req.body._id;
    const bookToCreate = { ...req.body, averageRating: 0, ratings: [] };
    await new Book(bookToCreate).save();
    res.status(201).json({ message: "Nouveau livre enregistré !" });
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.put("/api/books/:id", async (req, res, _) => {
  try {
    await Book.updateOne(
      { _id: req.params.id },
      { ...req.body, _id: req.params.id }
    );
    res.status(200).json({ message: "Livre modifié !" });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = app;
