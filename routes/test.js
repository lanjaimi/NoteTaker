const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
  res.send('post is working in route');
});

router.get('/', (req, res) => {
  res.send('get test working');
});

module.exports = router;
