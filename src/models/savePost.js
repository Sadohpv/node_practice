'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class SavePost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SavePost.belongsTo(models.User,{
        foreignKey: 'idUserSaved',
       

      });
      SavePost.belongsTo(models.Post,{
        foreignKey: 'idPostSaved',
       

      });
    }
  }
  SavePost.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idPostSaved: DataTypes.INTEGER,
    idUserSaved: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'SavePost',
    
  });
  return SavePost;
};