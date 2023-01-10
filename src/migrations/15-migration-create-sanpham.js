"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "sanphams",
      {
        sp_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        l_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "loais",
            key: "l_id",
          },
        },
        sp_ten: {
          type: Sequelize.STRING,
        },
        sp_mota: {
          type: Sequelize.STRING,
        },
        sp_soluong: {
          type: Sequelize.INTEGER,
        },
        sp_ngaytao: {
          type: Sequelize.DATE,
        },
        sp_ngaycapnhat: {
          type: Sequelize.DATE,
        },
        sp_ngayxoa: {
          type: Sequelize.DATE,
        },
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("sanphams");
  },
};
