'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {
        foreignKey: 'idWhoComment',
        
      })
    }
  }
  Comment.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idWhoComment: DataTypes.INTEGER,
    idPostComment : DataTypes.INTEGER,
    content: DataTypes.STRING,

    likeComment: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Comment',
    freezeTableName : true,
  });
  return Comment;
};