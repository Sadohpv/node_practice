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
      Post.hasMany(models.SavePost,{
        foreignKey: 'idPostSaved',


      });
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
    videoPost : DataTypes.BOOLEAN,
    likeCount: DataTypes.INTEGER,
    commentCount: DataTypes.INTEGER,

    shareCount: DataTypes.INTEGER,
    shareIdPost: DataTypes.INTEGER,  
    privatePost:  DataTypes.BOOLEAN,  
  }, {
    sequelize,
    modelName: 'Post',
    freezeTableName : true,
  });
  return Post;
};