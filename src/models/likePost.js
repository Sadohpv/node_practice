'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class LikePost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LikePost.init({
    idLikePost: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idPostLiked: DataTypes.INTEGER,
    idUserLikePost: DataTypes.INTEGER,
    liked : DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'LikePost',
    
  });
  return LikePost;
};