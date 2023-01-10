"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sanpham_dungluong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  sanpham_dungluong.init(
    {
      sp_id: DataTypes.INTEGER,
      dl_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
      createdAt: "spdl_ngaytao",
      updatedAt: "spdl_ngaycapnhat",
      deletedAt: "spdl_ngayxoa",
      modelName: "sanpham_dungluong",
    }
  );
  return sanpham_dungluong;
};
