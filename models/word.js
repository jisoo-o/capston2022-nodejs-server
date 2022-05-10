const Sequelize = require('sequelize');
// const Search = require('./search');



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
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Word',
      tableName: 'words',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    const Search = db.sequelize.define('search', {
      count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      } 
      }, { 
        timestamps: true,
        modelName: 'Search',
        tableName: 'search',
      }
    );

    db.Word.belongsToMany(db.User, {through: 'search'});
  }
};