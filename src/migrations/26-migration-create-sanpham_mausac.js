"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sanpham_mausacs", {
      sp_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: "sp_id",
        references: {
          model: "sanphams",
          key: "sp_id",
        },
      },
      ms_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: "ms_id",
        references: {
          model: "mausacs",
          key: "ms_id",
        },
      },
      spms_ngaytao: {
        type: Sequelize.DATE,
      },
      spms_ngaycapnhat: {
        type: Sequelize.DATE,
      },
      spms_ngayxoa: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("sanpham_mausacs");
  },
};
