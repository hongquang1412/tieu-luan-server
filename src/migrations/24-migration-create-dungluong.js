'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dungluongs', {
      dl_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dl_dungluong: {
        type: Sequelize.STRING
      },
      dl_ngaytao: {
        type: Sequelize.DATE,
      },
      dl_ngaycapnhat: {
        type: Sequelize.DATE,
      },
      dl_ngayxoa: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('dungluongs');
  }
};
