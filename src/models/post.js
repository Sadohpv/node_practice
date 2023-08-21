'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init({
    idPost: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idWhoPost: DataTypes.INTEGER,
    content: DataTypes.STRING,
    imgPost: DataTypes.STRING,

    likeCount: DataTypes.INTEGER,
    shareCount: DataTypes.INTEGER,
    shareIdPost: DataTypes.INTEGER,  

  }, {
    sequelize,
    modelName: 'Post',
    freezeTableName : true,
  });
  return Post;
};