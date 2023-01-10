"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class giatien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      giatien.belongsTo(models.dungluong, { foreignKey: "dl_id" });
      giatien.belongsTo(models.sanpham, { foreignKey: "sp_id" });
    }
  }
  giatien.init(
    {
      gt_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      dl_id: DataTypes.INTEGER,
      sp_id: DataTypes.INTEGER,
      gt_gia: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      createdAt: "gt_ngaytao",
      updatedAt: "gt_ngaycapnhat",
      deletedAt: "gt_ngayxoa",
      modelName: "giatien",
    }
  );
  return giatien;
};
