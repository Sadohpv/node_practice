"use strict";
import { Model } from "sequelize";
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Roles.belongsToMany(models.Level, {
        through: "LevelRole",
        as: "Level",

        foreignKey: "level_id",
      });
      // Roles.hasMany(models.LevelRoles);
    }
  }
  Roles.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Roles",
      freezeTableName: true,
    }
  );
  return Roles;
};
