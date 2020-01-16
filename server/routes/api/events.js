const express = require('express');
const router = express.Router();
const Event = require('../../models/events');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const fileUpload = require('express-fileupload');
const path = require('path');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

router.use(fileUpload());

// Upload Endpoint
router.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(path.join(__dirname, `../../../public/uploads/${file.name}`), err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

/// @ROUTE GET API/EVENTS
/// @DESC GET CURRENT USERS EVENT
/// @ACCESS PRIVATE
router.get('/', auth, async (req, res) => {
  try {
    const events = await Event.findAll({ where: { event_id: req.user.id } });

    if (!events) {
      return res.status(400).json({ msg: 'No Events Yet' });
    }
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/// @ROUTE GET API/EVENTS/LIST
/// DESC GET ALL ACTIVE EVENTS
/// @ACCESS PUBLIC
router.get('/list', async (req, res) => {
  try {
    const events = await Event.findAll();
    if (!events) {
      return res.status(400).json({ msg: 'No Events has created' });
    }
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/// @ROUTE GET API/EVENTS/ID=:ID&eventName=:eventName
/// @DESC GET SPESIFIC EVENT ALREADY CREATED
/// @ACCESS PUBLIC
router.get('/id=:id&eventName=:eventName', async (req, res) => {
  try {
    const events = await Event.findOne({
      where: { id: req.params.id, eventName: req.params.eventName }
    });
    if (!events) {
      return res.status(400).json({ msg: 'There is no events with that id' });
    }
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/// @ROUTE GET API/EVENTS/CATEGORY=:category
/// @DESC GET EVENT BY CATEGORY
/// @ACCESS PUBLIC
router.get('/category=:category', async (req, res) => {
  try {
    const events = await Event.findAll({
      where: { category: req.params.category }
    });
    if (!events) {
      return res.status(400).json({ msg: 'There is no events with that category' });
    }
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// VERIFYING TO UPDATE SOLD EVENT
router.put('/verify/id=:id&eventName=:eventName&:qty', async (req, res) => {
  try {
    const events = await Event.decrement('available', {
      by: req.params.qty,
      where: { id: req.params.id, eventName: req.params.eventName }
    });
    if (!events) {
      return res.status(400).json({ msg: 'There is no events with that id' });
    }
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// VERIFYING TO UPDATE SOLD EVENT
router.put('/verify/id=:id&:qty', async (req, res) => {
  try {
    const events = await Event.increment('sold', {
      by: req.params.qty,
      where: { id: req.params.id }
    });
    if (!events) {
      return res.status(400).json({ msg: 'There is no events with that id' });
    }
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// ADD SOME VIEWS TO EVENT IF BUYER VISIT EVENT
router.put('/views/id=:id&eventName=:eventName', async (req, res) => {
  try {
    const events = await Event.increment('views', {
      by: 1,
      where: { id: req.params.id, eventName: req.params.eventName }
    });
    if (!events) {
      return res.status(400).json({ msg: 'There is no events with that id' });
    }
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// UPDATE USER FROM ADMIN
router.put(
  '/update/id=:id&eventName=:eventName',
  auth,
  [
    [
      check('eventName', 'Event Name is Required')
        .not()
        .isEmpty(),
      check('organizer', 'Organization is Required')
        .not()
        .isEmpty(),
      check('city', 'City is Required')
        .not()
        .isEmpty(),
      check('dateStart', 'Date Start is Required')
        .not()
        .isEmpty(),
      check('dateEnd', 'Date End is Required')
        .not()
        .isEmpty(),
      check('category', 'Category is Required')
        .not()
        .isEmpty(),
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
      check('photo', 'Photo is Required')
        .not()
        .isEmpty(),
      check('price', 'Price is Required')
        .not()
        .isEmpty(),
      check('price', 'Price should be a number').isNumeric(),
      check('quantity', 'Quantity is Required')
        .not()
        .isEmpty(),
      check('quantity', 'Quantity should be a number').isNumeric(),
      check('description', 'Description is Required')
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
      organizer,
      eventName,
      dateStart,
      dateEnd,
      artist,
      category,
      requirement,
      term,
      redeem,
      venue,
      city,
      price,
      quantity,
      description,
      photo,
      sold,
      available
    } = req.body;
    try {
      const events = await Event.update(
        {
          organizer,
          eventName,
          dateStart,
          dateEnd,
          artist,
          category,
          requirement,
          term,
          redeem,
          venue,
          city,
          price,
          quantity,
          description,
          photo,
          sold,
          available
        },
        { where: { id: req.params.id, eventName: req.params.eventName } }
      );
      if (!events) {
        return res.status(400).json({ msg: 'There is no events with that id' });
      }
      res.json(events);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

/// @ROUTE GET POST API/EVENTS
/// @DESC POST CURRENT USERS EVENT
/// @ACCESS PRIVATE
router.post(
  '/',
  auth,
  [
    [
      check('eventName', 'Event Name is Required')
        .not()
        .isEmpty(),
      check('organizer', 'Organization is Required')
        .not()
        .isEmpty(),
      check('city', 'City is Required')
        .not()
        .isEmpty(),
      check('dateStart', 'Date Start is Required')
        .not()
        .isEmpty(),
      check('dateEnd', 'Date End is Required')
        .not()
        .isEmpty(),
      check('category', 'Category is Required')
        .not()
        .isEmpty(),
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
      check('fileName', 'File Name is Required')
        .not()
        .isEmpty(),
      check('price', 'Price is Required')
        .not()
        .isEmpty(),
      check('price', 'Price should be a number').isNumeric(),
      check('quantity', 'Quantity is Required')
        .not()
        .isEmpty(),
      check('quantity', 'Quantity should be a number').isNumeric(),
      check('description', 'Description is Required')
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
      organizer,
      eventName,
      dateStart,
      dateEnd,
      artist,
      category,
      requirement,
      term,
      redeem,
      venue,
      city,
      price,
      quantity,
      description,
      fileName,
      sold,
      available
    } = req.body;
    try {
      const data = await Event.create({
        event_id: req.user.id,
        organizer,
        eventName,
        dateStart,
        dateEnd,
        artist,
        category,
        requirement,
        term,
        redeem,
        venue,
        city,
        price,
        quantity,
        description,
        fileName,
        sold: 0,
        available: quantity,
        views: 0
      });
      res.json(data);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.delete('/id=:id', auth, async (req, res) => {
  try {
    const event = await Event.destroy({ where: { id: req.params.id } });
    if (!event) {
      return res.status(400).json({ msg: 'There is no event with that id' });
    }
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/count', async (req, res) => {
  try {
    const event = await Event.count();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/count=:category&:id', async (req, res) => {
  try {
    const event = await Event.sum('sold', {
      where: { category: req.params.category, event_id: req.params.id }
    });
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/// @ROUTE GET API/EVENTS
/// @DESC GET CURRENT USERS EVENT
/// @ACCESS PRIVATE
router.get('/search=:search', async (req, res) => {
  try {
    const events = await Event.findAll({
      where: {
        [op.or]: [
          Sequelize.where(Sequelize.fn('lower', Sequelize.col('category')), {
            [op.substring]: req.params.search
          }),
          Sequelize.where(Sequelize.fn('lower', Sequelize.col('eventName')), {
            [op.substring]: req.params.search
          }),
          Sequelize.where(Sequelize.fn('lower', Sequelize.col('artist')), {
            [op.substring]: req.params.search
          }),
          Sequelize.where(Sequelize.fn('lower', Sequelize.col('organizer')), {
            [op.substring]: req.params.search
          })
        ]
      }
    });

    if (!events) {
      return res.status(400).json({ msg: 'No Events Yet' });
    }
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/// @ROUTE GET POST API/EVENTS
/// @DESC POST CURRENT USERS EVENT
/// @ACCESS PRIVATE
router.post('/search', async (req, res) => {
  const { search } = req.body;
  try {
    const data = search;
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
