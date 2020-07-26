const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../congin');
const User = require('../models/User');

router.post('/ffr', (req, res) => {
  res.send(req.body);
});

router.post(
  '/',
  [
    check('email', '* Please enter a valid email').isEmail(),
    check(
      'password',
      '*Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;

      //see if user exist
      let emailPassed = await User.findOne({ email });

      if (emailPassed) {
        return res.json({ msg: 'user already exist' });
      }

      //create user

      let user = new User({
        email,
        password,
      });

      //encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // save user
      await user.save();

      //create payload

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, jwtSecret, { expiresIn: 3600 }, (err, token) => {
        if (err) {
          console.log(err);
        }

        res.json(token);
      });
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
