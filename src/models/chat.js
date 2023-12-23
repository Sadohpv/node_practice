"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Chat.belongsTo(models.User, {
        foreignKey: "chatFrom",
        as: "chatUserFrom",
      });
      Chat.belongsTo(models.User, {
        foreignKey: "chatTo",
        as: "chatUserTo",
      });
      Chat.hasMany(models.Chat, {
        foreignKey: "reply",
      });
      Chat.belongsTo(models.Chat, {
        foreignKey: "reply",
        as: "Reply",

      });
    }
  }
  Chat.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      chatFrom: DataTypes.INTEGER,
      chatTo: DataTypes.INTEGER,
      chat: DataTypes.STRING,
      reply: DataTypes.INTEGER,

      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Chat",
      freezeTableName: true,
    }
  );
  return Chat;
};
