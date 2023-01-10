"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class khachhang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      khachhang.hasMany(models.binhluan, { foreignKey: "kh_id" });
      khachhang.hasMany(models.donhang, { foreignKey: "kh_id" });
      khachhang.hasMany(models.diachi, { foreignKey: "kh_id" });
      khachhang.hasOne(models.taikhoan, { foreignKey: "tk_id" });
    }
  }
  khachhang.init(
    {
      kh_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tk_id: DataTypes.INTEGER,
      kh_hoten: DataTypes.STRING,
      kh_email: DataTypes.STRING,
      kh_sdt: DataTypes.STRING,
      kh_loai: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      createdAt: "kh_ngaytao",
      updatedAt: "kh_ngaycapnhat",
      deletedAt: "kh_ngayxoa",
      modelName: "khachhang",
    }
  );
  return khachhang;
};
