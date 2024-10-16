const express = require('express');
const router = express.Router();
const { register, login, getTasks, createTask, updateTask, deleteTask } = require('../controller/admin');
const { auth } = require('../midleware/isAuthAdmin');

// User routes
router.post('/login', login);

// User routes (protected)
router.get('/users', auth, getTasks);
router.post('/users', auth, createTask);
router.put('/users/:id', auth, updateTask);
router.delete('/users/:id', auth, deleteTask);

module.exports = router;
