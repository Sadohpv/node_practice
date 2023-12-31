"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Post", {
      idPost: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idWhoPost: {
        type: Sequelize.INTEGER,
      },
      content: {
        type: Sequelize.STRING,
      },
      imgPost: {
        type: Sequelize.STRING,
      },
      videoPost: {
        type: Sequelize.BOOLEAN,
      },
      likeCount: {
        type: Sequelize.INTEGER,
      },
      commentCount: {
        type: Sequelize.INTEGER,
      },
      shareCount: {
        type: Sequelize.INTEGER,
      },
      shareIdPost: {
        type: Sequelize.INTEGER,
      },
      privatePost: {
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
    await queryInterface.dropTable("Post");
  },
};
