const bcrypt = require('bcrypt');
const { Sequelize, QueryTypes } = require('sequelize');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.findAll();
  response.json(users);
});

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body;
  const check = await User.findOne({ where: { username }});
  // const check = await Sequelize.query('SELECT * FROM `users` where username = `username`', { type: QueryTypes.SELECT });
  console.log(' ****** check: ', check);
  if (check) {
    res.status(201).json(check);
    return;
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

module.exports = usersRouter;
