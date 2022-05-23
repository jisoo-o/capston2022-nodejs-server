const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Word = require('./word');
const Search = require('./search');

const db = {};
const sequelize = new Sequelize( 
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Word = Word;
db.Search = Search;

User.init(sequelize);
Word.init(sequelize);
Search.init(sequelize);

User.associate(db);
Word.associate(db);
Search.associate(db);

module.exports = db;