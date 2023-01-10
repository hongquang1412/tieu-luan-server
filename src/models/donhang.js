"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class donhang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      donhang.belongsTo(models.khachhang, { foreignKey: "kh_id" });
      donhang.belongsTo(models.nhanvien, { foreignKey: "nv_id" });
      donhang.hasMany(models.chitietdonhang, { foreignKey: "dh_id" });
    }
  }
  donhang.init(
    {
      dh_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nv_id: DataTypes.INTEGER,
      kh_id: DataTypes.INTEGER,
      dh_thoigiangh: DataTypes.DATE,
      dh_diachigh: DataTypes.STRING,
      dh_thanhtien: DataTypes.STRING,
      dh_trangthai: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      createdAt: "dh_ngaytao",
      updatedAt: "dh_ngaycapnhat",
      deletedAt: "dh_ngayxoa",
      modelName: "donhang",
    }
  );
  return donhang;
};
