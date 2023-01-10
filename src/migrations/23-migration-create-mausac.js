'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mausacs', {
      ms_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ms_mau: {
        type: Sequelize.STRING
      },
      ms_ma: {
        type: Sequelize.STRING
      },
      ms_ngaytao: {
        type: Sequelize.DATE,
      },
      ms_ngaycapnhat: {
        type: Sequelize.DATE,
      },
      ms_ngayxoa: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mausacs');
  }
};
