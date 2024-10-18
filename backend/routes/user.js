const express = require('express');
const router = express.Router();
const { register, login, postsales, getsales, changePassword, } = require('../controller/user');
const { auth } = require('../midleware/isAuthUser');

// User routes
router.post('/login', login);

// Sales routes (protected)
router.post('/sales', auth, postsales);
router.get('/sales', auth, getsales);
router.post('/changepassword',auth, changePassword);


module.exports = router;
