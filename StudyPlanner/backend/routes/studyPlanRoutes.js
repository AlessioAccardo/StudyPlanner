const express = require('express');
const router = express.Router();
const studyPlanCtrl = require('../controllers/studyPlanController');

// GET by student id
router.get('/student/:id', studyPlanCtrl.getByStudentId);

// GET by student full name
router.get('/search', studyPlanCtrl.getByStudentFullName);

module.exports = router;