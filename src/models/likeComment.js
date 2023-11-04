'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class LikeComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LikeComment.init({
    idLikeComment: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idCommentLike: DataTypes.INTEGER,
    idUserLikeComment: DataTypes.INTEGER,
    liked : DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'LikeComment',
    
  });
  return LikeComment;
};