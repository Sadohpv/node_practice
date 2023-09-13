"use strict";
import { Model } from "sequelize";
module.exports = (sequelize, DataTypes) => {
  class Level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Level.hasMany(models.User, {
        foreignKey: "level_id",
      });
      Level.belongsToMany(models.Roles, {
        through: "LevelRole",
        foreignKey: "role_id",
      });
    }
  }
  Level.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Level",
    }
  );
  return Level;
};
