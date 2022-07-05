const ReactDOMServer = require('react-dom/server');
const React = require('react');
const taskRouter = require('express').Router();
const { Task } = require('../../db/models');
const TasksList = require('../../views/TasksList');
const { Op } = require('sequelize');
// const TaskView = require('../../views/Task');

// страница /tasks. Достаём задачи из БД и отображаем их.
taskRouter.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    const tasks = await Task.findAll({
      where: {
        title: {
          [Op.like]: search ? `%${search}%` : '%',
        },
      },
      order: [
        ['createdAt', 'DESC'],
      ],
    });

    res.renderComponent(TasksList, { tasks });
  } catch (error) {
    console.error(error);
    res.redirect('/error');
  }
});

module.exports = taskRouter;
