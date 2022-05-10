const Sequelize = require('sequelize');

module.exports = class Word extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      word: {
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true,
      },
      meaning: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      path: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      // password: {
      //   type: Sequelize.STRING(100),
      //   allowNull: true,
      // },
      // provider: {
      //   type: Sequelize.STRING(10),
      //   allowNull: false,
      //   defaultValue: 'local',
      // },
      // snsId: {
      //   type: Sequelize.STRING(30),
      //   allowNull: true,
      // },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) { }
};