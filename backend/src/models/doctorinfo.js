'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DoctorInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DoctorInfo.belongsTo(models.Allcode, { foreignKey: "priceId", targetKey: "key", as: "priceData" });
      DoctorInfo.belongsTo(models.Allcode, { foreignKey: "provinceId", targetKey: "key", as: "provinceData" });
      DoctorInfo.belongsTo(models.Allcode, { foreignKey: "paymentId", targetKey: "key", as: "paymentData" });

      DoctorInfo.belongsTo(models.User, { foreignKey: "doctorId", targetKey: "id", as: "doctorInfoData" });
      DoctorInfo.belongsTo(models.Markdown, { foreignKey: "doctorId", targetKey: "doctorInfoId", as: "doctorMarkDownData" });
    }
  }
  DoctorInfo.init({
    doctorId: DataTypes.INTEGER,
    priceId: DataTypes.STRING,
    provinceId: DataTypes.STRING,
    paymentId: DataTypes.STRING,
    addressClinic: DataTypes.STRING,
    nameClinic: DataTypes.STRING,
    note: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DoctorInfo',
  });
  return DoctorInfo;
};