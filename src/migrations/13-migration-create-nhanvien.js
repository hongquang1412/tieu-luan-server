"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("nhanviens", {
      nv_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nv_hoten: {
        type: Sequelize.STRING,
      },
      nv_matkhau: {
        type: Sequelize.STRING,
      },
      nv_gioitinh: {
        type: Sequelize.INTEGER,
      },
      nv_email: {
        type: Sequelize.STRING,
      },
      nv_ngaysinh: {
        type: Sequelize.DATE,
      },
      nv_diachi: {
        type: Sequelize.STRING,
      },
      nv_sdt: {
        type: Sequelize.STRING,
      },
      nv_ngaytao: {
        type: Sequelize.DATE,
      },
      nv_ngaycapnhat: {
        type: Sequelize.DATE,
      },
      nv_ngayxoa: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("nhanviens");
  },
};
