/** @type {import('sequelize-cli').Migration} */
// eslint-disable-next-line import/no-import-module-exports
const bcryptjs = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Danilo Test',
          email: 'email@test.com',
          password_hash: await bcryptjs.hash('1234567', 8),
        },
        {
          name: 'Josias Test',
          email: 'email@test2.com',
          password_hash: await bcryptjs.hash('1234567', 8),
        },
        {
          name: 'Marck Test',
          email: 'email@test3.com',
          password_hash: await bcryptjs.hash('1234567', 8),
        },
      ],
      {},
    );
  },

  async down() {
    // Empty
  },
};
