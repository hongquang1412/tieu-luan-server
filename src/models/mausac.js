"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class mausac extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      mausac.belongsToMany(models.sanpham, {
        foreignKey: "ms_id",
        through: models.sanpham_mausac,
      });
    }
  }
  mausac.init(
    {
      ms_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "ms_id",
      },
      ms_mau: {
        type: DataTypes.STRING,
        field: "ms_mau",
      },
      ms_ma: {
        type: DataTypes.STRING,
        field: "ms_ma",
      },
    },
    {
      sequelize,
      paranoid: true,
      createdAt: "ms_ngaytao",
      updatedAt: "ms_ngaycapnhat",
      deletedAt: "ms_ngayxoa",
      modelName: "mausac",
    }
  );
  return mausac;
};
