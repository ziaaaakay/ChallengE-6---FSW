'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    //user table

    await queryInterface.addColumn("Users", "name", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Users", "username", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Users", "role", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    //Cars table

    await queryInterface.addColumn("Cars", "size", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Cars", "price", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Cars", "image", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Cars", "createdBy", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn("Cars", "updatedBy", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn("Cars", "deletedBy", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn("Cars", "available", {
      type: Sequelize.BOOLEAN,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
