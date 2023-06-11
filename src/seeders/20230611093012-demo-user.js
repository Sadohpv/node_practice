"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        userName: "Kusakari",
        email: "boizbucky@gmail.com",
        passWord: "123456",
        firstName: "Kusakari",
        lastName: "Katahashi",
        avatar: "",
        gender: 0,
        banAcc: 0,
        banLikeCom: 0,
        isAdmin: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
