"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("LikePost", {
   
      idLikePost: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idPostLiked: {
        type: Sequelize.INTEGER,

      },
      idUserLikePost: {
        type: Sequelize.INTEGER,

      },
      liked:{
        type: Sequelize.BOOLEAN,

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("LikePost");
  },
};
