const express = require('express');
const router = express.Router();
const coursesCtrl = require('../controllers/coursesController');

// GET all courses
router.get('/', coursesCtrl.getAll);

// GET by course id
router.get('/:id', coursesCtrl.getById);

// GET by course name
router.get('/search', coursesCtrl.getByName);

// GET by professor id
router.get('/search', coursesCtrl.getByProfessorId);

// GET by professor full name
router.get('/search', coursesCtrl.getByProfessorFullName);

// POST to create a course
router.post('/', coursesCtrl.create);

module.exports = router;

