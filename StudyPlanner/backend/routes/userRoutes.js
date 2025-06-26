const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');

// GET all users
router.get('/', userCtrl.getAll);

// GET by first name
router.get('/search', userCtrl.getByFName);

// GET by last name
router.get('/search', userCtrl.getByLName);

// GET by full name
router.get('/search', userCtrl.getByFullName);

// GET by user id
router.get('/:id', userCtrl.getById);

// GET by email
router.get('/:email', userCtrl.getByEmail);

module.exports = router;