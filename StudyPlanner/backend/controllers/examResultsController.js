const ExamResults = require('../models/examResults');

class ExamResultsController {
    static async create(req, res, next) {
        try {
            const { student_id, grade } = req.body;
            const creatingResult = await ExamResults.createResults(student_id, grade);
            res.status(201).json(creatingResult);
        } catch (err) {
            next(err);
        }
    }

    static async getAcceptedByStudent(req, res, next) {
        try {
            const { student_id } = req.params;
            const acceptedResult = await ExamResults.getAcceptedResultsByStudent(student_id);
            res.status(200).json(acceptedResult);
        } catch (err) {
            next(err);
        }
    }

    static async getByExamCode(req, res, next) {
        try {
            const { exam_code } = req.params;
            const acceptedResult = await ExamResults.getResultsByExamCode(exam_code);
            res.status(200).json(acceptedResult);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ExamResultsController;