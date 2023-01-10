"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chitietdonhang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      chitietdonhang.belongsTo(models.sanpham, { foreignKey: "sp_id" });
      chitietdonhang.belongsTo(models.donhang, { foreignKey: "dh_id" });
    }
  }
  chitietdonhang.init(
    {
      ctdh_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      dh_id: DataTypes.INTEGER,
      sp_id: DataTypes.INTEGER,
      ctdh_soluong: DataTypes.INTEGER,
      ctdh_mausac: DataTypes.STRING,
      ctdh_dungluong: DataTypes.STRING,
      ctdh_dongia: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      createdAt: "ctdh_ngaytao",
      updatedAt: "ctdh_ngaycapnhat",
      deletedAt: "ctdh_ngayxoa",
      modelName: "chitietdonhang",
    }
  );
  return chitietdonhang;
};
