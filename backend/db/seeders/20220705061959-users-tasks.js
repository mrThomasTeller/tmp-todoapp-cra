const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = {
  async up() {
    await User.create(
      {
        name: 'admin',
        password: await bcrypt.hash('admin', 10),
        Tasks: [
          {
            title: 'Изгнать дьявола из кота',
            done: false,
          },
          {
            title: 'Покрестить кота',
            done: true,
          },
        ],
      },
      {
        include: [User.Tasks],
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Tasks', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
