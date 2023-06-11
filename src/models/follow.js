'use strict';
import { Model } from 'sequelize';
module.exports =(sequelize, DataTypes) => {
  class Follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Follow.init({
    idFollower: DataTypes.INTEGER,
    idFollowing: DataTypes.INTEGER,  
  }, {
    sequelize,
    modelName: 'Follow',
  });
  return Follow;
};