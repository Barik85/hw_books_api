const express = require('express');
const router = express.Router();
const {
  getBooks,
  sendBooks,
  addBooks,
  updateBook,
  deleteBook
} = require('../controllers/books');


router.get('/', getBooks, sendBooks);
router.post('/', addBooks, sendBooks);
router.put('/:title', updateBook, sendBooks);
router.delete('/:title', deleteBook, sendBooks);

module.exports = router;
