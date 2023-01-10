'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('binhluans', {
      bl_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sp_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "sanphams",
          key: "sp_id",
        },
      },
      kh_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "khachhangs",
          key: "kh_id",
        },
      },
      bl_noidung: {
        type: Sequelize.STRING
      },
      bl_ngaytao: {
        type: Sequelize.DATE,
      },
      bl_ngaycapnhat: {
        type: Sequelize.DATE,
      },
      bl_ngayxoa: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('binhluans');
  }
};
