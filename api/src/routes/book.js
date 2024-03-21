const express = require("express");

const Book = require("../models/book");

const router = express.Router();

router.delete("/:id", async (req, res, _) => {
  try {
    await Book.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Livre supprimé !" });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/", async (_, res, __) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/:id", async (req, res, _) => {
  try {
    const book = await Book.findOne({ _id: req.params.id });
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ error });
  }
});

router.post("/", async (req, res, _) => {
  try {
    delete req.body._id;
    const bookToCreate = { ...req.body, averageRating: 0, ratings: [] };
    await new Book(bookToCreate).save();
    res.status(201).json({ message: "Nouveau livre enregistré !" });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.put("/:id", async (req, res, _) => {
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

module.exports = router;
