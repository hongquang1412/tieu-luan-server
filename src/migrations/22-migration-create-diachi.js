'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('diachis', {
      dc_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kh_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "khachhangs",
          key: "kh_id",
        },
      },
      dc_diachi: {
        type: Sequelize.STRING
      },
      dc_ngaytao: {
        type: Sequelize.DATE,
      },
      dc_ngaycapnhat: {
        type: Sequelize.DATE,
      },
      dc_ngayxoa: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('diachis');
  }
};
