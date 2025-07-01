const db = require('../db/database');

class EnrolledStudents{

    //tutti gli studenti
    static async getAllEnrolledStudents(){
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM enrolledStudents', [], (err, rows) => {
                if(err) return reject(err);
                resolve(rows);
            });
        });
    }

    //tutti gli studenti iscritti per esame
    static async getEnrolledStudentsByExam(exam_code){
        return new Promise((resolve, reject)=> {
            db.all(`
                SELECT * 
                FROM users AS u 
                JOIN enrolledStudents AS es 
                ON es.student_id = u.id
                WHERE es.exam_code = ?`,
                [exam_code], (err, rows) => {
                    if(err) return reject(err);
                    resolve(rows);
                });
        });
    }

    //studente iscritto ad un esame
    static async getStudentByExam(student_id, exam_code) {
        return new Promise((resolve, reject) =>{
            db.get('SELECT * FROM enrolledStudents WHERE student_id = ? AND exam_code = ?',
                [student_id, exam_code],
                (err, row) => {
                    if(err) return reject(err);
                    resolve(row);
                });
        });
    }

    //iscrizione studente ad un esame
    static async enrollStudent(student_id, exam_code) {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO enrolledStudents(student_id, exam_code) VALUES (?, ?)',
                [student_id, exam_code],
                function(err) {
                    if(err) return reject(err);
                    resolve({student_id, exam_code})
                });
        });
    }
    
    // disiscrizione studente da esame
    static async unenrollStudent(student_id, exam_code) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM enrolledStudents WHERE student_id = ? AND exam_code = ?', [student_id, exam_code], (err) => {
                if (err) return reject(err);
                resolve({ student_id, exam_code, deleted: this.changes});
            });
        });
    }
}

module.exports = EnrolledStudents;