const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Debug log to catch the error before the server crashes
console.log('--- USER CONTROLLER INSPECTION ---');
console.log('Controller Keys:', Object.keys(userController));
console.log('updateUser type:', typeof userController.updateUser);
console.log('deleteUser type:', typeof userController.deleteUser);
console.log('---------------------------------');

// Routes
router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.post('/login', userController.loginUser);

// ID-based routes
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;