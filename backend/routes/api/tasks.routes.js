const ReactDOMServer = require('react-dom/server');
const React = require('react');
const taskRouter = require('express').Router();
const { Op } = require('sequelize');
const { Task } = require('../../db/models');
const TasksList = require('../../views/TasksList');
const TaskView = require('../../views/Task');

taskRouter.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll({
      order: [
        ['createdAt', 'DESC'],
      ],
      // where: {
      //   title: {
      //     [Op.iLike]: `%${req.query.search || ''}%`,
      //   },
      // },
    });
    // await new Promise((r) => { setTimeout(r, 3000); });
    res.json(tasks);
  } catch (error) {
    res.redirect('/error');
  }
});

taskRouter.get('/done', async (req, res) => {
  try {
    const tasks = await Task.findAll({
      order: [
        ['createdAt', 'DESC'],
      ],
      where: {
        done: true,
      },
    });
    res.json(tasks);
  } catch (error) {
    res.redirect('/error');
  }
});

// POST-запрос на создание новой задачи
taskRouter.post('/', async (req, res) => {
  if (req.body.title.trim() === '') {
    return res.status(422).json({ error: 'Заголовок задачи не должен быть пустым' });
  }

  const task = await Task.create({
    title: req.body.title,
  });

  return res
    .status(201)
    // .renderComponent(TaskView, { task }, { doctype: false });
    .json(task);
});

// параметризированный запрос
// словит запросы на url /tasks/delete/1, /tasks/delete/2 и.т.
taskRouter.delete('/:id', async (req, res, next) => {
  try {
    // удаляем задачу с заданным id
    const removedCount = await Task.destroy({
      where: {
        // в req.params.id ляжет соответсвующая часть URL
        id: Number(req.params.id),
      },
    });

    if (removedCount === 0) {
      res
        .status(404)
        .json({ success: false, message: 'Нет такой задачи' });
    } else {
      res.json({ success: true });
    }
  } catch (er) {
    next(er);
  }
});

// параметризированный запрос
// словит запросы на url /tasks/toggle/1, /tasks/toggle/2 и.т.
taskRouter.put('/:id', async (req, res, next) => {
  try {
    // достаём из БД задачу с заданным id
    const task = await Task.findByPk(Number(req.params.id));

    if (!task) {
      res
        .status(404)
        .json({ success: false, message: 'Нет такой задачи' });

      return;
    }

    // меняем состояние задачи и сохраняем в БД
    if ('title' in req.body) task.title = req.body.title;
    if ('done' in req.body) task.done = req.body.done;
    await task.save();

    res.json({ success: true });
  } catch (er) {
    next(er);
  }
});

module.exports = taskRouter;
