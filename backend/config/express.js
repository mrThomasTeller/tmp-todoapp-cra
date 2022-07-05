const express = require('express');
// const cookieParser = require('cookie-parser');
const session = require('express-session');
const getUser = require('../middlewares/getUser');
const FileStore = require('session-file-store')(session);
const reactSsrMiddleware = require('../middlewares/reactSsr');

// Конфигурация сессии
const sessionConfig = {
  // сессии будут храниться в файлах
  store: new FileStore(),
  name: 'user_sid', // Имя куки для хранения id сессии. По умолчанию - connect.sid
  secret: process.env.SESSION_SECRET ?? 'G(8x>|Ai^"+&', // Секретное слово для шифрования, может быть любым
  resave: false, // Пересохранять ли куку при каждом запросе
  saveUninitialized: false, // Создавать ли сессию без инициализации ключей в req.session
  cookie: {
    maxAge: 1000 * 60 * 60 * 12, // Срок истечения годности куки в миллисекундах
    httpOnly: true, // Серверная установка и удаление куки, по умолчанию true
    // path: '/count'
  },
};

function expressConfig(app) {
  // миддлварки (middlewares, промежуточные фукнции):

  // позволяет запрашивать статический контент
  // (файлы, которые лежат в / public) с нашего сервера
  app.use(express.static(`${__dirname}/../public`));

  // при отправке формы методом POST данные из формы приходят
  // не сервер в зашифрованном виде
  // эта миддлварка расшифровывает их и кладёт в req.body
  app.use(express.urlencoded({ extended: true }));

  // расшифровывает json, который отправляется в запросах от клиента
  app.use(express.json());

  // расшифровывает куки в запросах от клиента
  // app.use(cookieParser());

  // миддлварка для работы с сессиями
  app.use(session(sessionConfig));

  // наша миддлварка для более компактного кода рендеринга
  app.use(reactSsrMiddleware);

  app.use(getUser);
}

module.exports = expressConfig;
