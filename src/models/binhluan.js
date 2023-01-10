"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class binhluan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      binhluan.belongsTo(models.sanpham, { foreignKey: "sp_id" });
      binhluan.belongsTo(models.khachhang, { foreignKey: "kh_id" });
    }
  }
  binhluan.init(
    {
      bl_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      sp_id: DataTypes.INTEGER,
      kh_id: DataTypes.INTEGER,
      bl_noidung: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      createdAt: "bl_ngaytao",
      updatedAt: "bl_ngaycapnhat",
      deletedAt: "bl_ngayxoa",
      modelName: "binhluan",
    }
  );
  return binhluan;
};
