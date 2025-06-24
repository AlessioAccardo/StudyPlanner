const { rejects } = require('assert');
const db = require('../db/database');

class Exam {
    async getAllExams() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FORM exams', [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }

    async getExamFromCode(code) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM exams WHERE id = ?', [code], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }

    async getExamFromName(name) {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM exams WHERE name = ?', [name], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }

    async getExamFromProfessorId(id) {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM exams WHERE professor_id = ?', [id], (err, rows) => {
                if (err) return (err);
                resolve(rows);
            });
        });
    }

    async getExamFromProfessorName(first_name, last_name) {
        return new Promise((resolve, reject) => {
            db.all(`
                SELECT u.first_name, u.last_name, e.code
                FROM exams as e
                JOIN users as u ON u.id == e.professor_id
                WHERE u.first_name == ? AND u.last_name == ?
            `, [first_name, last_name], (err, rows) => {
                if (err) reject (err);
                resolve(rows)
            })
        })
    }

    async createExam(name, credits, professor_id, date, course_id) {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO exams (name, credits, professor_id, date, course_id) VALUES (?,?,?,?,?)', [name, credits, professor_id, date, course_id], (err) => {
                if (err) reject(err);
                resolve({ name, credits, professor_id, date, course_id });
            });
        });
    }
}