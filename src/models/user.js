'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Level,{
        foreignKey: 'level_id',
      });
      User.hasMany(models.Friend,{
        foreignKey: 'friend_1',
      });
      User.hasMany(models.Friend,{
        foreignKey: 'friend_2',
      });
      User.hasMany(models.Comment,{
        foreignKey: 'idWhoComment',
      })
      User.hasMany(models.Notify,{
        foreignKey: 'idUserFrom',
      });
      User.hasMany(models.Notify,{
        foreignKey: 'idUserTo',
      });
      User.hasMany(models.SavePost,{
        foreignKey: 'idUserSaved',
      

      });
      User.hasMany(models.Chat,{
        foreignKey: 'chatFrom',
      });
      User.hasMany(models.Chat,{
        foreignKey: 'chatTo',
      });
      
    }
  }
  User.init({
    idUser: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    passWord: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    avatar: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    // address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    banAcc : DataTypes.BOOLEAN,
    banLikeCom : DataTypes.BOOLEAN,
    level_id : DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};