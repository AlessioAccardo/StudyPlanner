const db = require('../db/database');
const Courses = require('./courses')

class StudyPlan {
    static async getStudyPlanByStudentId(student_id) {
        return new Promise((resolve, reject) => {
            db.all(`
                SELECT s.student_id, s.course_id, c.name as course_name
                FROM studyPlan AS s
                JOIN courses AS c ON c.id = s.course_id 
                WHERE student_id = ?
                `, [student_id], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    static async getStudyPlanByStudentFullName(fname, lname) {
        return new Promise((resolve, reject) => {
            db.all(`
                SELECT u.id, s.course_id, c.name as course_name
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

    static async create(student_id, course_id) {
        const { name: course_name, credits } = await Courses.getCourseById(course_id);

        return new Promise((resolve, reject) => {
            db.run('INSERT INTO studyPlan(student_id, course_id, course_name, credits) VALUES (?,?,?,?)', [student_id, course_id, course_name, credits], function(err) {
                if (err) return reject(err);
                resolve({ student_id, course_id, course_name, credits });
            });
        });
    }
}

module.exports = StudyPlan;