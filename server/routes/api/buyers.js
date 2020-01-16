const express = require('express');
const router = express.Router();
const Buyer = require('../../models/buyers');
const Event = require('../../models/events');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

/// @ROUTE GET POST API/EVENTS
/// @DESCE GET CURRENT USERS EVENT
/// @ACCESS PRIVATE
router.put(
  '/id=:id&eventName=:eventName',
  [
    [
      check('name', 'Name Name is Required')
        .not()
        .isEmpty(),
      check('email', 'Email is Required')
        .not()
        .isEmpty(),
      check('telephone', 'Telephone is Required')
        .not()
        .isEmpty(),
      check('kk', 'National Identity Number is Required')
        .not()
        .isEmpty(),
      check('quantity', 'Quantity is Required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, telephone, quantity, price, kk } = req.body;
    try {
      const data = await Buyer.create({
        buyer_id: req.params.id,
        name,
        email,
        telephone,
        quantity,
        price,
        kk,
        valid: 0
      });
      res.json(data);
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'iqbal.ramadhan9933@gmail.com', // generated ethereal user
          pass: 'hanekawa933' // generated ethereal password
        }
      });
      // send mail with defined transport object
      let info = await transporter.sendMail(
        {
          from: `"Iqbal Ramadhan" <iqbal.ramadhan9933@gmail.com>`, // sender address
          to: `${email}`, // list of receivers
          subject: 'Finish Your Purchasement', // Subject line
          text: 'Hello world?', // plain text body
          html: `<h3>Hello, ${name}</h3><br>
          <p>Thanks for your purchasement. Please make sure the data below is correct</p>
          <p>Name : ${name}</p>
          <p>Email : ${email}</p>
          <p>National Identity Number : ${kk}</p>
          <p>Telephone : ${telephone}</p>
          <p>Quantity : ${quantity}</p>
          <p>Price : ${price}</p>
          <p>If it's correct, please click the link below to finish your purchasement</p> <a href="http://localhost:3000/events/verify/id=${req.params.id}&eventName=${req.params.eventName}&${quantity}">Finish Purchasement</a>.<br>Best Regards, <br>Our Team</p>` // html body
        },
        (err, data) => {
          if (err) {
            console.log('Error', err);
          } else {
            console.log('Email has been sent');
          }
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

/// @ROUTE GET API/BUYERS
/// DESC GET ALL BUYERS
/// @ACCESS PUBLIC
router.get('/', async (req, res) => {
  try {
    const buyer = await Buyer.findAll();
    if (!buyer) {
      return res.status(400).json({ msg: 'No Buyer has found' });
    }
    res.json(buyer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/id=:id', auth, async (req, res) => {
  try {
    const buyer = await Buyer.destroy({ where: { id: req.params.id } });
    if (!buyer) {
      return res.status(400).json({ msg: 'There is no buyer with that id' });
    }
    res.json(buyer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/// @ROUTE UPDATE POST API/BUYERS/UPDATE
/// @DESC UPDATE CURRENT BUYERS
/// @ACCESS PRIVATE
router.put(
  '/update/id=:id',
  [
    [
      check('name', 'Name is Required')
        .not()
        .isEmpty(),
      check('email', 'Email is Required')
        .not()
        .isEmpty(),
      check('telephone', 'Telephone is Required')
        .not()
        .isEmpty(),
      check('kk', 'National Identity Number is Required')
        .not()
        .isEmpty(),
      check('quantity', 'Quantity is Required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, telephone, quantity, price, valid } = req.body;
    try {
      const data = await Buyer.update(
        {
          name,
          email,
          telephone,
          quantity,
          price,
          valid
        },
        { where: { id: req.params.id } }
      );
      if (!data) {
        return res.status(400).json({ msg: 'There is no buyers with that id' });
      }
      res.json(data);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.get('/id=:id', auth, async (req, res) => {
  try {
    const user = await Buyer.findAll({ where: { id: req.params.id } });
    res.json(user);
  } catch (err) {
    console.error('err.message');
    res.status(500).send('Server Error');
  }
});

router.get('/buyer_id=:id', auth, async (req, res) => {
  try {
    const user = await Buyer.findAll({ where: { buyer_id: req.params.id, valid: 1 } });
    res.json(user);
  } catch (err) {
    console.error('err.message');
    res.status(500).send('Server Error');
  }
});

// Update valid to 1
router.put('/buyer_id=:id', async (req, res) => {
  try {
    const user = await Buyer.update({ valid: 1 }, { where: { buyer_id: req.params.id } });
    res.json(user);
  } catch (err) {
    console.error('err.message');
    res.status(500).send('Server Error');
  }
});

router.get('/count', async (req, res) => {
  try {
    const event = await Buyer.count();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
