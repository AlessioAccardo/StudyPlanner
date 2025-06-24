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


    //funzione di inserimento dei risultati per ogni esame
    async createExamResults(exam_code, student_id, grade){ 
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO examsResults(exam_code, student_id, grade) VALUES (?,?,?)', [exam_code, student_id, grade], (err) => {
                if(err) reject(err);
                resolve({exam_code, student_id, grade});
            });
        });
        }
    

    //funzione per i risultati di un singolo studente se il risultato è stato accettato (esame completato)
    async getAcceptedResultsByStudent(student_id) {
        return new Promise((resolve, reject) => {
             db.all( 
                'SELECT exam_code, grade FROM examResults WHERE student_id = ? AND accepted = 0', [student_id], (err, rows) => {
                    if (err) return reject(err);
                     resolve(rows)
        });
    });
}

    //funzione per tutti i risultati di un esame
    async getExamResultsFromExam(exam_code) {
        return new Promise((resolve, reject) => {
            db.all(
                'SELECT student_id, grade, accepted FROM examResults WHERE exam_code == ?',
                [exam_code],
                (err, rows) => {
                    if(err) return reject(err);
                    resolve(rows);
                }
            );
        });
    }

}
