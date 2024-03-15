const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

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

app.get("/api/books", (_, res, __) => {
  // Mocks to remove when we will return books from a database
  const books = [
    {
      _id: "1a1a1a1a1a1a1a1a1a1a1a1a",
      userId: "1a1a1a1a1a1a1a1a1a1a1a1a",
      title: "Livre n°1",
      author: "Auteur n°1",
      imageUrl: "https://pictures.abebooks.com/inventory/16277909918.jpg",
      year: 2024,
      genre: "Policier",
      ratings: [
        {
          userId: "2b2b2b2b2b2b2b2b2b2b2b2b",
          grade: 5,
        },
      ],
      averageRating: 5,
    },
    {
      _id: "2b2b2b2b2b2b2b2b2b2b2b2b",
      userId: "2b2b2b2b2b2b2b2b2b2b2b2b",
      title: "Livre n°2",
      author: "Auteur n°2",
      imageUrl:
        "https://i.pinimg.com/236x/f5/54/65/f55465b87aa48001e6514ef64ace9b26.jpg",
      year: 2023,
      genre: "Science-fiction",
      ratings: [
        {
          userId: "1a1a1a1a1a1a1a1a1a1a1a1a",
          grade: 4,
        },
      ],
      averageRating: 4,
    },
  ];
  res.status(200).json(books);
});

app.post("/api/books", (req, res, _) => {
  console.log(req.body);
  res.status(201).json({
    message: "Object created!",
  });
});

module.exports = app;
