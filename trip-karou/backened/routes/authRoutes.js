const express = require('express');
const router = express.Router();

// Define routes
router.get('/login', (req, res) => {
  res.send('Login Page');
});

router.get('/register', (req, res) => {
  res.send('Register Page');
});

module.exports = router; // Make sure to export the router
