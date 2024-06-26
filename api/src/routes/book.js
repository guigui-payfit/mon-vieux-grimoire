const express = require("express");

const {
  addRating,
  createBook,
  deleteBookById,
  getAllBooks,
  getBestRatedBooks,
  getBookById,
  updateBook,
} = require("../controllers/book");
const auth = require("../middlewares/auth");
const compressFile = require("../middlewares/compress-file");
const multer = require("../middlewares/multer-config");

const router = express.Router();

router.delete("/:id", auth, deleteBookById);
router.get("/", getAllBooks);
router.get("/bestrating", getBestRatedBooks);
router.get("/:id", getBookById);
router.post("/", auth, multer, compressFile, createBook);
router.post("/:id/rating", auth, addRating);
router.put("/:id", auth, multer, compressFile, updateBook);

module.exports = router;
