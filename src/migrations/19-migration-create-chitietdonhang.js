"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("chitietdonhangs", {
      ctdh_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      dh_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "donhangs",
          key: "dh_id",
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
      ctdh_soluong: {
        type: Sequelize.INTEGER,
      },
      ctdh_mausac: {
        type: Sequelize.STRING,
      },
      ctdh_dungluong:{
        type: Sequelize.STRING,
      },
      ctdh_dongia: {
        type: Sequelize.STRING,
      },
      ctdh_ngaytao: {
        type: Sequelize.DATE,
      },
      ctdh_ngaycapnhat: {
        type: Sequelize.DATE,
      },
      ctdh_ngayxoa: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("chitietdonhangs");
  },
};
