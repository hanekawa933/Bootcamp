const Sequelize = require('sequelize');
const db = require('../db/db');

const Events = db.define('event', {
  event_id: {
    type: Sequelize.INTEGER
  },
  organizer: {
    type: Sequelize.STRING
  },
  eventName: {
    type: Sequelize.STRING
  },
  dateStart: {
    type: Sequelize.DATE
  },
  dateEnd: {
    type: Sequelize.DATE
  },
  artist: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.STRING
  },
  requirement: {
    type: Sequelize.TEXT
  },
  term: {
    type: Sequelize.TEXT
  },
  redeem: {
    type: Sequelize.TEXT
  },
  venue: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.TEXT
  },
  fileName: {
    type: Sequelize.STRING
  },
  sold: {
    type: Sequelize.INTEGER
  },
  available: {
    type: Sequelize.INTEGER
  },
  views: {
    type: Sequelize.INTEGER
  }
});

module.exports = Events;
