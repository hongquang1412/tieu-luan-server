"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class taikhoan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      taikhoan.belongsTo(models.khachhang, { foreignKey: "tk_id" });
    }
  }
  taikhoan.init(
    {
      tk_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tk_tentk: DataTypes.STRING,
      tk_matkhau: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      createdAt: "tk_ngaytao",
      updatedAt: "tk_ngaycapnhat",
      deletedAt: "tk_ngayxoa",
      modelName: "taikhoan",
    }
  );
  return taikhoan;
};
