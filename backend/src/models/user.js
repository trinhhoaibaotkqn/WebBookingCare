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
      User.belongsTo(models.Allcode, { foreignKey: "positionId", targetKey: "key", as: "positionData" })
      User.belongsTo(models.Allcode, { foreignKey: "gender", targetKey: "key", as: "genderData" })
      User.belongsTo(models.Allcode, { foreignKey: "roleid", targetKey: "key", as: "roleData" })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    image: DataTypes.STRING,
    roleid: DataTypes.STRING,
    positionId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};