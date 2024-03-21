const express = require("express");

const {
  createBook,
  deleteBookById,
  getAllBooks,
  getBookById,
  updateBook,
} = require("../controllers/book");

const router = express.Router();

router.delete("/:id", deleteBookById);
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", createBook);
router.put("/:id", updateBook);

module.exports = router;
