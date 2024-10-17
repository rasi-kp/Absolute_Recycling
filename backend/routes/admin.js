const express = require('express');
const router = express.Router();
const { login,addUser, deleteUser, blockUser, unblockUser } = require('../controller/admin');
const { auth } = require('../midleware/isAuthAdmin');

// User routes
router.post('/login', login);

// User routes (protected)
router.post('/adduser', auth, addUser);
router.delete('/deleteuser/:email', auth, deleteUser);
router.patch('/blockuser/:email', auth, blockUser);
router.patch('/unblockuser/:email', auth, unblockUser);


module.exports = router;
