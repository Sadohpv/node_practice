'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notify extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Notify.belongsTo(models.User,{
        foreignKey: 'idUserFrom',
        as: "notifyFrom",
      });
      Notify.belongsTo(models.User,{
        foreignKey: 'idUserTo',
        as: "notifyTo",

      });
    }
  }
  Notify.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
     idUserFrom: DataTypes.INTEGER,
     idUserTo : DataTypes.INTEGER,
     status : DataTypes.INTEGER,
     content : DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Notify',
    freezeTableName : true,
  });
  return Notify;
};