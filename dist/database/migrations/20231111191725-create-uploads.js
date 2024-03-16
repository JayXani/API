"use strict";/* eslint-disable lines-around-directive */
// eslint-disable-next-line strict
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'pictures',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        filename: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        originalname: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        pic_student_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'students',
            key: 'id',
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
      },
    );
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pictures');
  },
};
