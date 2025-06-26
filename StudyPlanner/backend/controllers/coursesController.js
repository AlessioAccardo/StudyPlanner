const Courses = require('../models/courses');

class CoursesController {
    static async create(req, res, next) {
        try {
            const { name, professor_id } = req.body;
            const creatingCourse = await Courses.createCourse(name, professor_id);
            res.status(201).json(creatingCourse);
        } catch (err) {
            next(err);
        }
    }

    static async getAll(req, res, next) {
        try {
            const list = await Courses.getAllCourses();
            if (!list || list.length === 0) return res.status(404).json({ message: 'Corsi non trovati'});
            res.status(200).json(list);
        } catch (err) {
            next(err);
        }
    }

    static async getByProfessorId(req, res, next) {
        try {
            const { professor_id } = req.query;
            const list = await Courses.getCoursesByProfessorId(professor_id);
            if (!list || list.length === 0) return res.status(404).json({ message: 'Corsi non trovati'});
            res.status(200).json(list);
        } catch (err) {
            next(err);
        }
    }

    static async getByProfessorFullName(req, res, next) {
        try {
            const { first_name, last_name } = req.query;
            const list = await Courses.getCourseByProfessorFullName(first_name, last_name);
            if (!list || list.length === 0) return res.status(404).json({ message: 'Corsi non trovati'});
            res.status(200).json(list);
        } catch (err) {
            next(err);
        }
    }

    static async getById(req, res, next) {
        try {
            const { id } = req.params;
            const courseRow = await Courses.getCourseById(id);
            if (!courseRow) return res.status(404).json({ message: 'Corso non trovato'});
            res.status(200).json(courseRow);
        } catch (err) {
            next(err);
        }
    }

    static async getByName(req, res, next) {
        try {
            const { name } = req.query;
            const list = await Courses.getCourseByName(name);
            if (!list || list.length === 0) return res.status(404).json({ message: 'Corsi non trovati'});
            res.status(200).json(list);
        } catch (err) {
            next(err);
        }
    }
 }

 module.exports = CoursesController;