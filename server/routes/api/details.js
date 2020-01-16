const express = require('express');
const router = express.Router();
const Details = require('../../models/details');
const User = require('../../models/users');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

/// @ROUTE GET API/EVENTS
/// @DESCE GET CURRENT USERS DETAIL
/// @ACCESS PRIVATE
router.get('/', auth, async (req, res) => {
  try {
    const details = await Details.findAll({ where: { detail_id: req.user.id } });

    if (!details) {
      return res.status(400).json({ msg: 'No Event Details Yet' });
    }

    res.json(details);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/// @ROUTE GET API/DETAILS/LIST
/// @DESC GET ALL ACTIVE DETAILS
/// @ACCESS PUBLIC
router.get('/list', async (req, res) => {
  try {
    const events = await Details.findAll();
    if (!events) {
      return res.status(400).json({ msg: 'No Details has created' });
    }
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/// @ROUTE GET POST API/EVENTS
/// @DESCE GET CURRENT USERS EVENT
/// @ACCESS PRIVATE
router.post(
  '/',
  [
    auth,
    [
      check('artist', 'Artist is Required')
        .not()
        .isEmpty(),
      check('requirement', 'Requirement is Required')
        .not()
        .isEmpty(),
      check('term', 'Term is Required')
        .not()
        .isEmpty(),
      check('redeem', 'Redeem is Required')
        .not()
        .isEmpty(),
      check('venue', 'Venue is Required')
        .not()
        .isEmpty(),
      check('price', 'Price is Required')
        .not()
        .isEmpty(),
      check('price', 'Price is should be a number').isNumeric(),
      check('quantity', 'Quantity is Required')
        .not()
        .isEmpty(),
      check('quantity', 'Quantity is should be a number').isNumeric(),
      check('description', 'Description is Required')
        .not()
        .isEmpty(),
      check('photo', 'Photo is Required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      artist,
      requirement,
      term,
      redeem,
      venue,
      price,
      quantity,
      description,
      photo,
      eventName,
      category
    } = req.body;
    try {
      const details = await Details.create({
        detail_id: req.user.id,
        artist,
        requirement,
        term,
        redeem,
        venue,
        price,
        quantity,
        description,
        photo,
        sold: '0',
        available: quantity,
        eventName,
        category
      });

      res.json(details);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

/// @ROUTE GET API/EVENTS/ID=:ID&eventName=:eventName
/// @DESC GET SPESIFIC EVENT ALREADY CREATED
/// @ACCESS PUBLIC
router.get('/id=:id&eventName=:eventName', async (req, res) => {
  try {
    const events = await Details.findOne({
      where: { id: req.params.id, eventName: req.params.eventName }
    });
    if (!events) {
      return res.status(400).json({ msg: 'There is no details with that id' });
    }
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
