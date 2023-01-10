"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sanpham extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      sanpham.belongsTo(models.loai, { foreignKey: "l_id" });
      sanpham.hasOne(models.giam, { foreignKey: "sp_id" });
      sanpham.hasMany(models.binhluan, { foreignKey: "sp_id" });
      sanpham.belongsToMany(models.mausac, {
        foreignKey: "sp_id",
        through: models.sanpham_mausac,
      });
      sanpham.belongsToMany(models.dungluong, {
        foreignKey: "sp_id",
        through: models.sanpham_dungluong,
      });
      sanpham.hasMany(models.hinh, { foreignKey: "sp_id" });
      sanpham.hasMany(models.giatien, { foreignKey: "sp_id" });
      sanpham.hasMany(models.chitietphieunhap, { foreignKey: "sp_id" });
    }
  }
  sanpham.init(
    {
      sp_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      l_id: DataTypes.INTEGER,
      sp_ten: DataTypes.STRING,
      sp_mota: DataTypes.STRING,
      sp_soluong: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
      createdAt: "sp_ngaytao",
      updatedAt: "sp_ngaycapnhat",
      deletedAt: "sp_ngayxoa",
      modelName: "sanpham",
    }
  );
  return sanpham;
};
