'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Allcode.hasMany(models.User, { foreignKey: "positionId", as: "positionData" });
      Allcode.hasMany(models.User, { foreignKey: "gender", as: "genderData" });
      Allcode.hasMany(models.User, { foreignKey: "roleid", as: "roleData" });
      Allcode.hasMany(models.Schedule, { foreignKey: "timeType", as: "timeData" });
      Allcode.hasMany(models.DoctorInfo, { foreignKey: "priceId", as: "priceData" });
      Allcode.hasMany(models.DoctorInfo, { foreignKey: "provinceId", as: "provinceData" });
      Allcode.hasMany(models.DoctorInfo, { foreignKey: "paymentId", as: "paymentData" });
      Allcode.hasMany(models.Booking, { foreignKey: "timeType", as: "timeAppointment" });
    }
  }
  Allcode.init({
    key: DataTypes.STRING,
    type: DataTypes.STRING,
    valueEn: DataTypes.STRING,
    valueVi: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Allcode',
  });
  return Allcode;
};