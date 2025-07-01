const db = require('../db/database');

class ExamResults {
    //funzione di inserimento dei risultati per ogni esame
    static async createResults(student_id, exam_code, grade){ 
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO examsResults(student_id, exam_code, grade) VALUES (?,?,?)', [student_id, exam_code, grade],
                function(err) {
                if(err) return reject(err);
                resolve({ id: this.lastID, student_id, exam_code, grade});
            });
        });
    }
    

    //funzione per i risultati di un singolo studente se il risultato è stato accettato (esame completato)
    static async getAcceptedResultsByStudent(student_id) {
        return new Promise((resolve, reject) => {
             db.all( 
                `SELECT exam_code, grade
                FROM examResults
                WHERE student_id = ? AND accepted = ?`,
                [student_id, 1], (err, rows) => {
                    if (err) return reject(err);
                    resolve(rows);
            });
        });
    }

    static async getResultsByProfessorId(professor_id) {
        return new Promise((resolve, reject) => {
            db.all('SELECT student_id, grade, accepted FROM examResults WHERE professor_id = ?', [professor_id], (err, rows) => {
                if(err) return reject(err);
                resolve(rows);
            });
        });
    }

    //funzione per tutti i risultati di un esame
    static async getResultsByExamCode(exam_code) {
        return new Promise((resolve, reject) => {
            db.all('SELECT student_id, grade, accepted FROM examResults WHERE exam_code = ?', [exam_code], (err, rows) => {
                if(err) return reject(err);
                resolve(rows);
            });
        });
    }

    static async acceptResult(student_id, exam_code, value) {
        const valueInt = value ? 1 : 0;
        return new Promise((resolve, reject) => {
            db.run('UPDATE examResults SET accepted = ? WHERE student_id = ? AND exam_code = ?', [valueInt, student_id, exam_code],
                function(err) {
                if (err) return reject(err);
                resolve({ student_id, exam_code, accepted: !!valueInt, changes: this.changes });
            });
        });
    }
}

module.exports = ExamResults;