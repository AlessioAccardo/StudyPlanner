const express = require('express');
const router = express.Router();
const examCtrl = require('../controllers/examController');

// GET all
router.get('/', examCtrl.getAll);

// GET by code
router.get('/:code', examCtrl.getByCode);

// GET by name
router.get('/:name', examCtrl.getByName);

// GET by professor id
router.get('/professor/:professor_id', examCtrl.getByProfessorId);

// GET by professor full name
router.get('/search', examCtrl.getByProfessorName);

// GET for exams requests
router.get('/requested', examCtrl.requested);

//POST to create an exam
router.post('/', examCtrl.create);

// PUT to approve/disapprove an exam
router.put('/approve', examCtrl.approve);

module.exports = router;