'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('loais', {
      l_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      l_ten: {
        type: Sequelize.STRING
      },
      l_hinh: {
        type: Sequelize.STRING
      },
      l_ngaytao: {
        type: Sequelize.DATE,
      },
      l_ngaycapnhat: {
        type: Sequelize.DATE,
      },
      l_ngayxoa: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('loais');
  }
};
