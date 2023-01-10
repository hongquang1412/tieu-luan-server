"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("phieunhaps", {
      pn_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nv_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "nhanviens",
          key: "nv_id",
        },
      },
      pn_thanhtien: {
        type: Sequelize.STRING,
      },
      pn_ngaytao: {
        type: Sequelize.DATE,
      },
      pn_ngaycapnhat: {
        type: Sequelize.DATE,
      },
      pn_ngayxoa: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("phieunhaps");
  },
};
