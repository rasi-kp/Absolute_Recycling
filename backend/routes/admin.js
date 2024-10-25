const express = require('express');
const router = express.Router();
const { login,addUser, deleteUser, blockUser, unblockUser, resetPaswword, getsales, alluser } = require('../controller/admin');
const { auth } = require('../midleware/isAuthAdmin');

// User routes
router.post('/login', login);

// User routes (protected)
router.post('/adduser', auth, addUser);
router.get('/alluser', auth, alluser);
router.delete('/deleteuser/:email', auth, deleteUser);
router.patch('/blockuser/:email', auth, blockUser);
router.patch('/unblockuser/:email', auth, unblockUser);
router.get('/resetpassword/:email',auth,resetPaswword);
router.get('/sales',auth,getsales);


module.exports = router;
