const Sequelize = require('sequelize');
const db = require('../db/db');

const details = db.define('detail', {
  detail_id: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.TEXT
  },
  artist: {
    type: Sequelize.STRING
  },
  requirement: {
    type: Sequelize.STRING
  },
  term: {
    type: Sequelize.STRING
  },
  redeem: {
    type: Sequelize.STRING
  },
  venue: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  photo: {
    type: Sequelize.BLOB
  },
  available: {
    type: Sequelize.INTEGER
  },
  sold: {
    type: Sequelize.INTEGER
  },
  eventName: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.STRING
  }
});

module.exports = details;
