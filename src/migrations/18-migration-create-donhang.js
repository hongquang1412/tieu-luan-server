"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("donhangs", {
      dh_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nv_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "nhanviens",
          key: "nv_id",
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
      dh_thoigiangh: {
        type: Sequelize.DATE,
      },
      dh_diachigh: {
        type: Sequelize.STRING,
      },
      dh_thanhtien: {
        type: Sequelize.STRING,
      },
      dh_trangthai:{
        type: Sequelize.STRING,
      },
     dh_ngaytao: {
        type: Sequelize.DATE,
      },
     dh_ngaycapnhat: {
        type: Sequelize.DATE,
      },
     dh_ngayxoa: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("donhangs");
  },
};
