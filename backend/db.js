require('dotenv').config();

const { sequelize } = require('./db/models');

sequelize.sync({ alter: true });
