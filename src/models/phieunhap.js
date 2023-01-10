"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class phieunhap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      phieunhap.belongsTo(models.nhanvien, { foreignKey: "nv_id" });
      phieunhap.hasMany(models.chitietphieunhap, { foreignKey: "pn_id" });
    }
  }
  phieunhap.init(
    {
      pn_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      pn_thanhtien: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      createdAt: "pn_ngaytao",
      updatedAt: "pn_ngaycapnhat",
      deletedAt: "pn_ngayxoa",
      modelName: "phieunhap",
    }
  );
  return phieunhap;
};
