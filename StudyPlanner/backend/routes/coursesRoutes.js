const express = require('express');
const router = express.Router();
const coursesCtrl = require('../controllers/coursesController');

// GET all courses
router.get('/', coursesCtrl.getAll);

// GET by course id
router.get('/:id', coursesCtrl.getById);

// GET by course name, professor id o professor full name
router.get('/search', coursesCtrl.search);

// POST to create a course
router.post('/', coursesCtrl.create);

module.exports = router;

