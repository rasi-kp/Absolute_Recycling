const express = require('express');
const router = express.Router();
const { register, login, } = require('../controller/user');
const { auth } = require('../midleware/isAuthUser');

// User routes
router.post('/login', login);

// Task routes (protected)
// router.get('/tasks', auth, getTasks);


module.exports = router;
