"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sanpham_dungluongs", {
      sp_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: "sp_id",
        references: {
          model: "sanphams",
          key: "sp_id",
        },
      },
      dl_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: "dl_id",
        references: {
          model: "dungluongs",
          key: "dl_id",
        },
      },
      spdl_ngaytao: {
        type: Sequelize.DATE,
      },
      spdl_ngaycapnhat: {
        type: Sequelize.DATE,
      },
      spdl_ngayxoa: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("sanpham_dungluongs");
  },
};
