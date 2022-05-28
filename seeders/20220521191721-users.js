'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Users', [
       {
          user_name: 'Hola 1',
          user_email: 'prueba1@gmail.com',
          user_pwd: 'Hola#123',
          created_on: new Date(),
          last_login: null
      },
       {
          user_name: 'Prueba 2',
          user_email: 'prueba2@gmail.com',
          user_pwd: 'Hola#123',
          created_on: new Date(),
          last_login: null
      },

    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
