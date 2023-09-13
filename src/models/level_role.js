'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class LevelRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LevelRole.hasMany(models.Level,{
        foreignKey: 'id',
      });
      LevelRole.hasMany(models.Roles,{
        foreignKey: 'id',
      });
    }
  }
  LevelRole.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    level_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,

    
  }, {
    sequelize,
    modelName: 'LevelRole',
    
  });
  return LevelRole;
};