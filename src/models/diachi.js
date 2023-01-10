"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class diachi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      diachi.belongsTo(models.khachhang, { foreignKey: "kh_id" });
    }
  }
  diachi.init(
    {
      dc_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      kh_id: DataTypes.INTEGER,
      dc_diachi: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      createdAt: "dc_ngaytao",
      updatedAt: "dc_ngaycapnhat",
      deletedAt: "dc_ngayxoa",
      modelName: "diachi",
    }
  );
  return diachi;
};
