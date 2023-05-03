'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Schedule.belongsTo(models.Allcode, { foreignKey: "timeType", targetKey: "key", as: "timeData" });
      Schedule.belongsTo(models.User, { foreignKey: "doctorId", targetKey: "id", as: "scheduleData" });
    }
  }
  Schedule.init({
    currentNumber: DataTypes.INTEGER,
    maxNumber: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    doctorId: DataTypes.INTEGER,
    timeType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};