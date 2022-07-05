const mainRouter = require('express').Router();
const Main = require('../../views/Main');
const Error = require('../../views/Error');

mainRouter.get('/', async (req, res) => {
  res.renderComponent(Main);
});

mainRouter.post('/', async (req, res) => {
  req.app.locals.wall = req.body.wall;
  res.redirect('/');
});

mainRouter.get('/error', (req, res) => {
  res.renderComponent(Error);
});

module.exports = mainRouter;
