'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('giatiens', {
      gt_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dl_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "dungluongs",
          key: "dl_id",
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
      gt_gia: {
        type: Sequelize.STRING
      },
      gt_ngaytao: {
        type: Sequelize.DATE,
      },
      gt_ngaycapnhat: {
        type: Sequelize.DATE,
      },
      gt_ngayxoa: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('giatiens');
  }
};
