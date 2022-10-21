'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Cars", "type", {
    });
    await queryInterface.removeColumn("Cars", "email", {
    });
    await queryInterface.removeColumn("Cars", "username", {
    });
    await queryInterface.removeColumn("Cars", "password", {
    });
  },

  async down (queryInterface, Sequelize) {
    
  }
}
