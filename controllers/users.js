const lodash = require('lodash');
const data = require('../mock-data/users');


module.exports.getUsers = (req, res, next) => {
  req.users = data;
  next();
};

module.exports.sendUsers = (req, res, next) => {
  res.status(200).json(req.users);
}

module.exports.addUser = (req, res, next) => {
  const user = req.body;
  data.push(user);
  req.users = data;

  next();
}

module.exports.deleteUser = (req, res, next) => {
  const index = req.params.index;
  data.splice(index, 1);
  req.users = data;

  next();
}

module.exports.updateUser = (req, res, next) => {
  const index = req.params.index;
  const newData = req.body;
  data[index] = lodash.merge(data[index], newData)
  req.users = data;
  next();
}
