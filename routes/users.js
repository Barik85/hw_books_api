const express = require('express');
const router = express.Router({});
const {
  getUsers,
  sendUsers,
  addUser,
  deleteUser,
  updateUser
} = require('../controllers/users');
const booksRouter = require('./books');


router.get('/', getUsers, sendUsers);
router.post('/', addUser, sendUsers);
router.delete('/:index', deleteUser, sendUsers);
router.put('/:index', updateUser, sendUsers);
router.use('/:index/books', booksRouter);

module.exports = router;
