const express = require('express');
const router = express.Router();
const { register, login, postsales, } = require('../controller/user');
const { auth } = require('../midleware/isAuthUser');

// User routes
router.post('/login', login);

// Sales routes (protected)
router.post('/sales', auth, postsales);


module.exports = router;
