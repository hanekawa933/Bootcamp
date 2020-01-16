const Sequelize = require('sequelize');

const db = new Sequelize('bootcamp', 'postgres', 'hanekawa', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    multipleStatements: true
  }
});

module.exports = db;
