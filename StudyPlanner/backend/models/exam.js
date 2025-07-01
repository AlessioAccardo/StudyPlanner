const db = require('../db/database');
const Courses = require('../models/courses');

class Exam {
    static async getAllExams() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM exams', [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    static async getAllApprovedExams() { 
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM exams WHERE approved = ?', [1], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            })
        });
    }


    static async getExamByCode(code) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM exams WHERE code = ?', [code], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }

    static async getExamsByName(name) {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM exams WHERE name = ?', [name], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    static async getExamsByProfessorId(id) {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM exams WHERE professor_id = ?', [id], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    static async getExamsByProfessorName(first_name, last_name) {
        return new Promise((resolve, reject) => {
            db.all(`
                SELECT u.first_name, u.last_name, e.code
                FROM exams as e
                JOIN users as u ON u.id = e.professor_id
                WHERE u.first_name = ? AND u.last_name = ?
            `, [first_name, last_name], (err, rows) => {
                if (err) return reject (err);
                resolve(rows)
            });
        });
    }

    static async createExam(course_id, date) {
        const { name, professor_id, credits } = await Courses.getCourseById(course_id);

        return new Promise((resolve, reject) => {
            db.run('INSERT INTO exams (name, credits, professor_id, date, course_id) VALUES (?,?,?,?,?)', [name, credits, professor_id, date, course_id],
                function(err) {
                if (err) return reject(err);
                resolve({ code: this.lastID, name, credits, professor_id, approved: null, enrolled_students: 0, date, course_id });
            });
        });
    }

    static async examsRequested() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM exams WHERE approved IS NULL`, [], (err, rows) => {
                if (err) return reject (err);
                resolve(rows);
            });
        });
    }

    static async approveExam(code, approved) {
        const approvedInt = approved ? 1 : 0;
        return new Promise((resolve, reject) => {
            db.run('UPDATE exams SET approved = ? WHERE code = ?', [approvedInt, code], (err) => {
                if (err) return reject(err);
                resolve({ approved, code });
            });
        });
    }
}

module.exports = Exam;