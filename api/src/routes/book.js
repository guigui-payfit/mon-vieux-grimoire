const express = require("express");

const {
  createBook,
  deleteBookById,
  getAllBooks,
  getBookById,
  updateBook,
} = require("../controllers/book");
const auth = require("../middlewares/auth");
const compressFile = require("../middlewares/compress-file");
const multer = require("../middlewares/multer-config");

const router = express.Router();

router.delete("/:id", auth, deleteBookById);
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", auth, multer, compressFile, createBook);
router.put("/:id", auth, multer, compressFile, updateBook);

module.exports = router;
