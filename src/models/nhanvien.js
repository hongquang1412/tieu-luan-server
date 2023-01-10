"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class nhanvien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      nhanvien.hasMany(models.donhang, {foreignKey: "nv_id"})
      nhanvien.hasMany(models.phieunhap, {foreignKey: "nv_id"})
    }
  }
  nhanvien.init(
    {
      nv_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nv_hoten: DataTypes.STRING,
      nv_matkhau: DataTypes.STRING,
      nv_gioitinh: DataTypes.INTEGER,
      nv_email: DataTypes.STRING,
      nv_ngaysinh: DataTypes.DATE,
      nv_diachi: DataTypes.STRING,
      nv_sdt: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      createdAt: "nv_ngaytao",
      updatedAt: "nv_ngaycapnhat",
      deletedAt: "nv_ngayxoa",
      modelName: "nhanvien",
    }
  );
  return nhanvien;
};
