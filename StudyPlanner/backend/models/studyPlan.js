const db = require('../db/database');

class studyPlan {
    static async getStudyPlanByStudentId(student_id) {
        return new Promise((resolve, reject) => {
            db.all('SELECT course_id FROM studyPlan WHERE student_id = ?', [student_id], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    static async getStudyPlanByStudentFullName(fname, lname) {
        return new Promise((resolve, reject) => {
            db.all(`
                SELECT course_id
                FROM studyPlan as s
                JOIN users as u ON u.id = s.student_id
                JOIN courses as c ON c.id = s.course_id
                WHERE u.first_name = ? AND u.last_name = ?
            `, [fname, lname], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    static async getMeanOfGradesByStudentId(id) {
        return new Promise((resolve, reject) => {
            db.get(`
                SELECT AVG(grade) AS mean
                FROM studyPlan
                WHERE student_id = ?
            `, [id], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }
}

module.exports = studyPlan;