const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../congin');
const User = require('../models/User');

router.post(
  '/',
  [check('email', 'email invalid').isEmail()],
  async (req, res) => {
    //see if data is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      //see if user exist
      const user = await User.findOne({ email });

      if (!user) {
        return res.json({ errors: [{ msg: ['invalid email or password'] }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      //see if password entred is the same as the one linked to email
      if (!isMatch) {
        return res.json({ errors: [{ msg: ['invalid email or password'] }] });
      }

      //create payload

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, jwtSecret, (err, token) => {
        if (err) {
          console.log(err);
        }

        res.json(token);
      });
    } catch (err) {
      res.status(500).send('Server error');
      console.log(err.message);
    }
  }
);

module.exports = router;
