const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
// DB Model
const users = require('../../models/users');

/// @ROUTE GET API/USERS
/// @DESC GET CURRENT USERS EVENT
/// @ACCESS PRIVATE
router.get('/', auth, async (req, res) => {
  try {
    const user = await users.findAll({ where: { isAdmin: 0 } });

    if (!user) {
      return res.status(400).json({ msg: 'No Users' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/id=:id', auth, async (req, res) => {
  try {
    const user = await users.destroy({ where: { id: req.params.id } });
    if (!user) {
      return res.status(400).json({ msg: 'There is no user with that id' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/// @ROUTES API/USERS
/// @DESC CREATE USERS
/// @PUBLIC
router.post(
  '/',
  [
    check('username', 'Username is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, email } = req.body;

    try {
      // See if user exists
      let user = await users.findOne({ where: { email } });

      if (user) {
        res.status(400).json({
          errors: [
            {
              msg: 'User already exists'
            }
          ]
        });
      } else {
        //Encrypt Passworrd
        let { password } = req.body;
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        user = await users.create({
          email,
          username,
          password,
          isAdmin: 0
        });

        const payload = {
          user: {
            id: user.id
          }
        };

        // Return json web token
        jwt.sign(payload, config.get('jwtToken'), { expiresIn: 3600000 }, (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

/// @ROUTE UPDATE POST API/USERS/UPDATE
/// @DESC UPDATE CURRENT USERS
/// @ACCESS PRIVATE
router.put(
  '/update/id=:id',
  [
    check('username', 'Username is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('isAdmin', 'Is Admin is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, username, isAdmin } = req.body;
    try {
      //Encrypt Passworrd
      let { password } = req.body;
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      const data = await users.update(
        {
          email,
          username,
          password,
          isAdmin
        },
        { where: { id: req.params.id } }
      );
      if (!data) {
        return res.status(400).json({ msg: 'There is no users with that id' });
      }
      res.json(data);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.get('/count', async (req, res) => {
  try {
    const event = await users.count();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
