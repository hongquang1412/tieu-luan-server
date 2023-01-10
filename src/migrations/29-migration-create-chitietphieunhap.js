"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("chitietphieunhaps", {
      ctpn_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pn_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "phieunhaps",
          key: "pn_id",
        },
      },
      sp_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "sanphams",
          key: "sp_id",
        },
      },
      ctpn_soluong: {
        type: Sequelize.INTEGER,
      },
      ctpn_dongia: {
        type: Sequelize.STRING,
      },
      ctpn_ngaytao: {
        type: Sequelize.DATE,
      },
      ctpn_ngaycapnhat: {
        type: Sequelize.DATE,
      },
      ctpn_ngayxoa: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("chitietphieunhaps");
  },
};
