const db = require('../db/database');

class Exam {
    static async getAllExams() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM exams', [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    static async getExamByCode(code) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM exams WHERE id = ?', [code], (err, row) => {
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

    static async createExam(name, credits, professor_id, date, course_id) {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO exams (name, credits, professor_id, date, course_id) VALUES (?,?,?,?,?)', [name, credits, professor_id, date, course_id],
                function(err) {
                if (err) return reject(err);
                resolve({ id: this.lastID, name, credits, professor_id, date, course_id });
            });
        });
    }

    static async examsRequested() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM exams WHERE accepted IS NULL`, [], (err, rows) => {
                if (err) return reject (err);
                resolve(rows);
            });
        });
    }

    static async approveExam(code, approved) {
        return new Promise((resolve, reject) => {
            db.run('UPDATE exams SET approved = ? WHERE code = ?', [approved, code], (err) => {
                if (err) return reject(err);
                resolve({ approved, code });
            });
        });
    }
}

module.exports = Exam;