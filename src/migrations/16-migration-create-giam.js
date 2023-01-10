"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("giams", {
      g_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sp_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "sanphams",
          key: "sp_id",
        },
      },
      g_phantram: {
        type: Sequelize.INTEGER ,
      },
      g_ngaybd: {
        type: Sequelize.DATE,
      },
      g_ngaykt: {
        type: Sequelize.DATE,
      },
      g_ngaytao: {
        type: Sequelize.DATE,
      },
      g_ngaycapnhat: {
        type: Sequelize.DATE,
      },
      g_ngayxoa: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("giams");
  },
};
