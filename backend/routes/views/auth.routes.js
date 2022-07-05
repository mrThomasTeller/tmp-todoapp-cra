const authRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const Login = require('../../views/Login');
const Register = require('../../views/Register');

authRouter
  .route('/register')
  .get((req, res) => {
    res.renderComponent(Register);
  })
  .post(async (req, res) => {
    const { name, password } = req.body;

    const existingUser = await User.findOne({ where: { name } });
    // проверяем есть ли уже такой пользователь в БД
    if (existingUser) {
      res.send('Такой пользователь уже есть');
      return;
    }

    // создаём нового пользователя
    const user = await User.create({
      name,
      // хэшируем пароль, чтобы не хранить в открытом виде в БД
      password: await bcrypt.hash(password, 10),
    });

    // кладём id нового пользователя в хранилище сессии (сразу логиним пользователя)
    req.session.userId = user.id;
    res.redirect('/');
  });

authRouter
  .route('/login')
  .get((req, res) => {
    res.renderComponent(Login);
  })
  .post(async (req, res) => {
    const { name, password } = req.body;
    const existingUser = await User.findOne({ where: { name } });

    // проверяем, что такой пользователь есть в БД и пароли совпадают
    if (existingUser && await bcrypt.compare(password, existingUser.password)) {
      // кладём id нового пользователя в хранилище сессии (логиним пользователя)
      req.session.userId = existingUser.id;
      req.session.user = existingUser;
      res.redirect('/');
    } else {
      res.send('Такого пользователя нет либо пароли не совпадают');
    }
  });

authRouter.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = authRouter;
