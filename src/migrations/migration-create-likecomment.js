"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("LikeComment", {
   
      idLikeComment: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idCommentLike: {
        type: Sequelize.INTEGER,

      },
      idUserLikeComment: {
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
    await queryInterface.dropTable("LikeComment");
  },
};
