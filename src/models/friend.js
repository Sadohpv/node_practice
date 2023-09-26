'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Friend.belongsTo(models.User,{
        foreignKey: 'friend_1',
        as: "friendAsked",
      });
      Friend.belongsTo(models.User,{
        foreignKey: 'friend_2',
        as: "friendAsking",

      });
    }
  }
  Friend.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    friend_1: DataTypes.INTEGER,
    friend_2: DataTypes.INTEGER,
    status : DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Friend',
    
  });
  return Friend;
};