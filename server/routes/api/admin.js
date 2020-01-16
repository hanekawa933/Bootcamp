const express = require('express');
const router = express.Router();
const Buyer = require('../../models/buyers');
const User = require('../../models/users');
const Event = require('../../models/events');

router.get('/', (req, res) => {
  res.json('Fuck You');
});

module.exports = router;
