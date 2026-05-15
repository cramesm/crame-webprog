const express = require('express');
const router = express.Router();
const path = require('path');

// Using absolute-style paths for Vercel
const personnelController = require(path.join(__dirname, '..', 'controllers', 'personnelController'));

// Routes
router.get('/', personnelController.getUsers);
router.post('/', personnelController.createUser);
router.post('/login', personnelController.loginUser);

// ID-based routes
router.put('/:id', personnelController.updateUser);
router.delete('/:id', personnelController.deleteUser);

module.exports = router;