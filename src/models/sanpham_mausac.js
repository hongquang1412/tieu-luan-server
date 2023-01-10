"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sanpham_mausac extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  sanpham_mausac.init(
    {
      sp_id: DataTypes.INTEGER,
      ms_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
      createdAt: "spms_ngaytao",
      updatedAt: "spms_ngaycapnhat",
      deletedAt: "spms_ngayxoa",
      modelName: "sanpham_mausac",
    }
  );
  return sanpham_mausac;
};
