"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class loai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      loai.hasMany(models.sanpham, { foreignKey: "l_id" });
    }
  }
  loai.init(
    {
      l_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      l_ten: DataTypes.STRING,
      l_hinh: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      createdAt: "l_ngaytao",
      updatedAt: "l_ngaycapnhat",
      deletedAt: "l_ngayxoa",
      modelName: "loai",
    }
  );
  return loai;
};
