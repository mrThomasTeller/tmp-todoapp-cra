require('dotenv').config();

// не забудь установить babel:
// npm i @babel/core @babel/preset - env @babel/preset-react @babel/register
// также не забудь положить файл .babelrc в корень проекта
const express = require('express');
const path = require('path');
const expressConfig = require('./config/express');

// импортируем роутеры (там лежат наши ручки)
const taskApiRouter = require('./routes/api/tasks.routes');
const authRouter = require('./routes/api/auth.routes');

const app = express();
const PORT = process.env.PORT ?? 3000;

// функция настройки экспресса
expressConfig(app);

// подключаем роутеры
app.use('/api/auth', authRouter);
app.use('/api/tasks', taskApiRouter); // роутер списка задач (все url начинаются с /api/tasks)

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, _next) => {
  console.error('Произошла ошибка', error);
  res.status(500).json({
    success: false,
    message: 'Непредвиденная ошибка сервера, попробуйте зайти позже',
  });
});

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend-rtk/public/index.html'));
});

app.listen(PORT, () => console.log(`server started at ${PORT}`));
