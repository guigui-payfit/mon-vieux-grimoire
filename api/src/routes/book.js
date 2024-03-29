const express = require("express");

const {
  createBook,
  deleteBookById,
  getAllBooks,
  getBookById,
  updateBook,
} = require("../controllers/book");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

const router = express.Router();

router.delete("/:id", auth, deleteBookById);
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", auth, multer, createBook);
router.put("/:id", auth, multer, updateBook);

module.exports = router;
