"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("khachhangs", {
      kh_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tk_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "taikhoans",
          key: "tk_id",
        },
      },
      kh_hoten: {
        type: Sequelize.STRING,
      },
      kh_email: {
        type: Sequelize.STRING,
      },
      kh_sdt: {
        type: Sequelize.STRING,
      },
      kh_loai: {
        type: Sequelize.STRING,
      },
      kh_ngaytao: {
        type: Sequelize.DATE,
      },
      kh_ngaycapnhat: {
        type: Sequelize.DATE,
      },
      kh_ngayxoa: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("khachhangs");
  },
};
