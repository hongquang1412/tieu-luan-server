"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("taikhoans", {
      tk_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tk_tentk: {
        type: Sequelize.STRING,
        unique: true,
      },
      tk_matkhau: {
        type: Sequelize.STRING,
      },
      tk_ngaytao: {
        type: Sequelize.DATE,
      },
      tk_ngaycapnhat: {
        type: Sequelize.DATE,
      },
      tk_ngayxoa: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("taikhoans");
  },
};
