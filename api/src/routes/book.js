const express = require("express");

const {
  createBook,
  deleteBookById,
  getAllBooks,
  getBookById,
  updateBook,
} = require("../controllers/book");
const auth = require("../middlewares/auth");

const router = express.Router();

router.delete("/:id", auth, deleteBookById);
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", auth, createBook);
router.put("/:id", auth, updateBook);

module.exports = router;
