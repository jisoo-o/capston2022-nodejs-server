const Sequelize = require('sequelize');


module.exports = class Search extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      } 
    }, {
      sequelize,
      timestamps: true,
      modelName: 'Search',
      tableName: 'search',
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    Search.belongsTo(db.Word);
    Search.belongsTo(db.User);
  }
};