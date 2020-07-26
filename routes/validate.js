const express = require('express');
const router = express.Router();
const authMiddleware = require('../authMiddleware');
const User = require('../models/User');

router.get('/', authMiddleware, async (req, res) => {
  try {
    console.log('validate called');
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.send('Server Error');
  }
});

module.exports = router;
