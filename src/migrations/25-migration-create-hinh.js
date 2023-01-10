'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hinhs', {
      h_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sp_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "sanphams",
          key: "sp_id",
        },
      },
      h_ten: {
        type: Sequelize.STRING
      },
      h_ngaytao: {
        type: Sequelize.DATE,
      },
      h_ngaycapnhat: {
        type: Sequelize.DATE,
      },
      h_ngayxoa: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('hinhs');
  }
};
