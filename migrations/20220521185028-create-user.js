'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      user_pwd: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_on: {
        allowNull: false,
        type: Sequelize.DATE
      },
      last_login: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};