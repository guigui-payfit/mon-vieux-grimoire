const Book = require("../models/book");

exports.createBook = async (req, res, _) => {
  try {
    delete req.body._id;
    const bookToCreate = { ...req.body, averageRating: 0, ratings: [] };
    await new Book(bookToCreate).save();
    res.status(201).json({ message: "Nouveau livre enregistré !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.deleteBookById = async (req, res, _) => {
  try {
    await Book.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Livre supprimé !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getAllBooks = async (_, res, __) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getBookById = async (req, res, _) => {
  try {
    const book = await Book.findOne({ _id: req.params.id });
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ error });
  }
};

exports.updateBook = async (req, res, _) => {
  try {
    await Book.updateOne(
      { _id: req.params.id },
      { ...req.body, _id: req.params.id }
    );
    res.status(200).json({ message: "Livre modifié !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
