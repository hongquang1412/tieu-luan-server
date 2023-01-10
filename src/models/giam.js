"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class giam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      giam.belongsTo(models.sanpham, { foreignKey: "sp_id" });
    }
  }
  giam.init(
    {
      g_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      sp_id: DataTypes.INTEGER,
      g_phantram: DataTypes.INTEGER,
      g_ngaybd: DataTypes.DATE,
      g_ngaykt: DataTypes.DATE,
    },
    {
      sequelize,
      paranoid: true,
      createdAt: "g_ngaytao",
      updatedAt: "g_ngaycapnhat",
      deletedAt: "g_ngayxoa",
      modelName: "giam",
    }
  );
  return giam;
};
