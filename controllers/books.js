const lodash = require('lodash');
const data = require('../mock-data/users');


module.exports.getBooks = (req, res, next) => {
  const index = req.params.index;
  req.books = data[index].books;

  if (req.books.length < 1) {
    throw new Error('Books no found!');
  }

  next();
}

module.exports.addBooks = (req, res, next) => {
  const index = req.params.index;
  const newBooks = req.body;
  const books = data[index].books;

  newBooks.forEach(book => {
    books.push(book);
  });

  req.books = books;

  next();
}

module.exports.updateBook = (req, res, next) => {
  const index = req.params.index;
  const title = req.params.title.toLocaleLowerCase();
  const userBooks = data[index].books;
  const newBookData = req.body;
  debugger;
  userBooks.forEach(book => {
    if(slug(book.title.toLocaleLowerCase()) === title) {
      book = lodash.merge(book, newBookData);
    }
  })
  req.books = userBooks;

  next();
}

module.exports.deleteBook = (req, res, next) => {
  const index = req.params.index;
  const title = req.params.title.toLocaleLowerCase();
  let userBooks = data[index].books;

  userBooks = userBooks.filter(book => slug(book.title.toLocaleLowerCase()) !== title);
  req.books = userBooks;

  next();
}

module.exports.sendBooks = (req, res, next) => {
  res.status(200);
  res.json(req.books);
}
