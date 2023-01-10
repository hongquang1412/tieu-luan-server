"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class dungluong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      dungluong.belongsToMany(models.sanpham, {
        foreignKey: "dl_id",
        through: models.sanpham_dungluong,
      });
      dungluong.hasOne(models.giatien, { foreignKey: "dl_id" })
    }
  }
  dungluong.init(
    {
      dl_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "dl_id",
      },
      dl_dungluong: {
        type: DataTypes.STRING,
        field: "dl_dungluong",
      },
    },
    {
      sequelize,
      paranoid: true,
      createdAt: "dl_ngaytao",
      updatedAt: "dl_ngaycapnhat",
      deletedAt: "dl_ngayxoa",
      modelName: "dungluong",
    }
  );
  return dungluong;
};
