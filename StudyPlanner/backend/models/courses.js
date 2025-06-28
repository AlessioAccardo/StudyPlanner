const db = require('../db/database');

class Courses {
    static async createCourse(name, professor_id, credits) {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO courses(name, professor_id, credits) VALUES (?,?,?)', [name, professor_id, credits],
                function(err) {
                    if (err) return reject(err);
                    resolve({ id: this.lastID, name, professor_id, credits });
                }
            );
        });
    }

    static async getAllCourses() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM courses', [], (err, rows) => {
                if (err) return reject(err);
                resolve (rows);
            });
        });
    }

    static async getCoursesByProfessorId(professor_id) {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM courses WHERE professor_id = ?', [professor_id], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    static async getCourseByProfessorFullName(fname, lname) {
        return new Promise((resolve, reject) => {
            db.all(`
                SELECT * FROM courses as c
                JOIN users as u ON u.id = c.professor_id
                WHERE u.first_name = ? AND u.last_name = ?
            `, [fname, lname], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    static async getCourseById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM courses WHERE id = ?', [id], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }

    static async getCourseByName(name) {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM courses WHERE name = ?', [name], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
}

module.exports = Courses;