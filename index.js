const config = require('./config/development');
const app = require('express')();
const data = require('./mock-data/users');
const bodyParser = require('body-parser');
const slug = require('slug');

//controlers
const getUsers = (req, res, next) => {
 req.users = data;
 next();
};

const sendUsers = (req, res, next) => {
  res.status(200).json(req.users);
}

const addUser = (req, res, next) => {
  const user = req.body;
  data.push(user);
  req.users = data;

  next();
}

const deleteUser = (req, res, next) => {
  const index = req.params.index;
  data.splice(index, 1);
  req.users = data;

  next();
}

const updateUser = (req, res, next) => {
  const index = req.params.index;
  const newData = req.body;
  data[index] = Object.assign(data[index], newData)
  req.users = data;
  next();
}

const getBooks = (req, res, next) => {
  const index = req.params.index;
  req.books = data[index].books;

  if (req.books.length < 1) {
    throw new Error('Books no found!');
  }

  next();
}

const addBooks = (req, res, next) => {
  const index = req.params.index;
  const newBooks = req.body;
  const books = data[index].books;

  newBooks.forEach(book => {
    books.push(book);
  });

  req.books = books;

  next();
}

const updateBook = (req, res, next) => {
  const index = req.params.index;
  const title = req.params.title.toLocaleLowerCase();
  const userBooks = data[index].books;
  const newBookData = req.body;

  userBooks.forEach(book => {
    if(slug(book.title.toLocaleLowerCase() === title)) {
      book = Object.assign(book, newBookData)
    }
  })
  req.books = userBooks;

  next();
}

const deleteBook = (req, res, next) => {
  const index = req.params.index;
  const title = req.params.title.toLocaleLowerCase();
  let userBooks = data[index].books;

  userBooks = userBooks.filter(book => slug(book.title.toLocaleLowerCase()) !== title);
  req.books = userBooks;

  next();
}

const sendBooks = (req, res, next) => {
  res.status(200);
  res.json(req.books);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use((req, res, next) => {
  console.log(`${req.url} --> ${req.method} --> ${Date.now()}`);

  next();
});

//users
app.get('/users/', getUsers , sendUsers);
app.post('/users', addUser, sendUsers);
app.delete('/users/:index', deleteUser, sendUsers);
app.put('/users/:index', updateUser, sendUsers);


//books
app.get('/users/:index/books', getBooks, sendBooks);
app.post('/users/:index/books', addBooks, sendBooks);
app.put('/users/:index/books/:title', updateBook, sendBooks);
app.delete('/users/:index/books/:title', deleteBook, sendBooks);

app.use((req, res, next) => {
  const err = new Error('Not found');
  next(err);
})

app.use((err, req, res, next) => {
  res.status(500);
  res.json({
    error: err.message,
    stack: err.stack
  })
})


app.listen(config.port);
