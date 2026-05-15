const express = require('express');
const router = express.Router();
const personnelController = require('../controllers/personnelController');

// Debug log to catch the error before the server crashes
console.log('--- PERSONNEL CONTROLLER INSPECTION ---');
console.log('Controller Keys:', Object.keys(personnelController));
console.log('updateUser type:', typeof personnelController.updateUser);
console.log('deleteUser type:', typeof personnelController.deleteUser);
console.log('---------------------------------');

// Routes
router.get('/', personnelController.getUsers);
router.post('/', personnelController.createUser);
router.post('/login', personnelController.loginUser);

// ID-based routes
router.put('/:id', personnelController.updateUser);
router.delete('/:id', personnelController.deleteUser);

module.exports = router;