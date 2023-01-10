"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chitietphieunhap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      chitietphieunhap.belongsTo(models.phieunhap, { foreignKey: "pn_id" });
      chitietphieunhap.belongsTo(models.sanpham, { foreignKey: "sp_id" });
    }
  }
  chitietphieunhap.init(
    {
      ctpn_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      pn_id: DataTypes.INTEGER,
      sp_id: DataTypes.INTEGER,
      ctpn_soluong: DataTypes.INTEGER,
      ctpn_dongia: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
      createdAt: "ctpn_ngaytao",
      updatedAt: "ctpn_ngaycapnhat",
      deletedAt: "ctpn_ngayxoa",
      modelName: "chitietphieunhap",
    }
  );
  return chitietphieunhap;
};
