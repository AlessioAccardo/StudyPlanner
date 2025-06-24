const exam = require('../models/exam');

class ExamController {
    async getAll(req, res, next) {
        try {
            const list = await esami.getAll();
            res.json(list);
        } catch (err) {
            next(err);
        }
    }

    async getByCode(req, res, next) {
        try {
        const { code } = req.params;
        const exam = await esami.getByCode(code);
        if (!exam) return res.status(404).json({ message: 'Esame non trovato'});
        res.json(exam);
        } catch (err) {
            next(err);
        }
    }

    async getByName(req, res, next) {
        try {
            const { name } = req.params;
            const exam = await esami.getByName(name);
            if (!exam) return res.status(404).json({ message: 'Esame non trovato'});
        } catch (err) {
            next(err);
        }
    }

    async getByProfessorId(req, res, next) {
        try {
            const { professor_id } = req.params;
            const exams = await exam.getByProfessorId(professor_id);
            res.json(exams);
        } catch (err) {
            next(err);
        }
    }

}


