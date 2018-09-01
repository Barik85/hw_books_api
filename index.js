const config = require('./config/development');
const app = require('express')();
const data = require('./mock-data/users');
const bodyParser = require('body-parser');
const slug = require('slug');
const usersRouter = require('./routes/users');

//controlers

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use((req, res, next) => {
  console.log(`${req.url} --> ${req.method} --> ${Date.now()}`);

  next();
});


//users
app.use('/users/', usersRouter);



//books
// app.get('/users/:index/books', getBooks, sendBooks);
// app.post('/users/:index/books', addBooks, sendBooks);
// app.put('/users/:index/books/:title', updateBook, sendBooks);
// app.delete('/users/:index/books/:title', deleteBook, sendBooks);

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
