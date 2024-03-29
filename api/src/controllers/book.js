const fs = require("fs");
const path = require("path");

const Book = require("../models/book");

exports.createBook = async (req, res, _) => {
  try {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject.userId;

    const bookToCreate = {
      ...bookObject,
      averageRating: 0,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
      ratings: [],
      userId: req.auth.userId,
    };
    await new Book(bookToCreate).save();

    res.status(201).json({ message: "Nouveau livre enregistré !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.deleteBookById = async (req, res, _) => {
  try {
    const existingBookToDelete = await Book.findOne({ _id: req.params.id });
    if (existingBookToDelete.userId !== req.auth.userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const fileName = existingBookToDelete.imageUrl.split("/images/")[1];
    fs.unlink(path.join(__dirname, `../images/${fileName}`), async () => {
      await Book.deleteOne({ _id: req.params.id });
    });

    res.status(200).json({ message: "Livre supprimé !" });
  } catch (error) {
    res.status(500).json({ error });
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
    const isFileUpdated = !!req.file;

    const bookObject = isFileUpdated
      ? {
          ...JSON.parse(req.body.book),
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }
      : req.body;
    delete bookObject.userId;

    const existingBookToUpdate = await Book.findOne({ _id: req.params.id });
    if (existingBookToUpdate.userId !== req.auth.userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (isFileUpdated) {
      const nameOfPreviousFile =
        existingBookToUpdate.imageUrl.split("/images/")[1];
      fs.unlink(
        path.join(__dirname, `../images/${nameOfPreviousFile}`),
        async () => {
          await Book.updateOne(
            { _id: req.params.id },
            { ...bookObject, _id: req.params.id }
          );
        }
      );
    } else {
      await Book.updateOne(
        { _id: req.params.id },
        { ...bookObject, _id: req.params.id }
      );
    }

    res.status(200).json({ message: "Livre modifié !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
