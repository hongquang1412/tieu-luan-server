"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class hinh extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      hinh.belongsTo(models.sanpham, { foreignKey: "sp_id" });
    }
  }
  hinh.init(
    {
      h_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      sp_id: DataTypes.INTEGER,
      h_ten: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      createdAt: "h_ngaytao",
      updatedAt: "h_ngaycapnhat",
      deletedAt: "h_ngayxoa",
      modelName: "hinh",
    }
  );
  return hinh;
};
