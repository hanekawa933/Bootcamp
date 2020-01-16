const Sequelize = require('sequelize');
const db = require('../db/db');

const Buyers = db.define('buyer', {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  telephone: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.INTEGER
  },
  kk: {
    type: Sequelize.STRING
  },
  buyer_id: {
    type: Sequelize.INTEGER
  },
  valid: {
    type: Sequelize.INTEGER
  }
});

module.exports = Buyers;
