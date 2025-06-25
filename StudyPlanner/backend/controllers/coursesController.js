const Courses = require('../models/courses');

class CoursesController {
    static async getCourseResultsById(course_id) {
        return new Promise((resolve, reject) => {
            db.all(`
                SELECT * FROM courses AS c
                JOIN exams AS e ON e.course_id = c.course_id
                JOIN examResults AS er ON er.exam_code = e.code
                WHERE c.id = ?
            `, [course_id], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }
}