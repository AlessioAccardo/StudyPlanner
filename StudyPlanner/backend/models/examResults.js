const db = require('../db/database');

class ExamResults {
    //funzione di inserimento dei risultati per ogni esame
    static async createResults(student_id, grade){ 
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO examsResults(student_id, grade) VALUES (?,?)', [student_id, grade],
                function(err) {
                if(err) reject(err);
                resolve({ id: this.lastID, student_id, grade});
            });
        });
    }
    

    //funzione per i risultati di un singolo studente se il risultato è stato accettato (esame completato)
    static async getAcceptedResultsByStudent(student_id) {
        return new Promise((resolve, reject) => {
             db.all( 
                'SELECT exam_code, grade FROM examResults WHERE student_id = ? AND accepted = 0', [student_id], (err, rows) => {
                    if (err) return reject(err);
                     resolve(rows)
            });
        });
    }

    //funzione per tutti i risultati di un esame
    static async getResultsByExamCode(exam_code) {
        return new Promise((resolve, reject) => {
            db.all(
                'SELECT student_id, grade, accepted FROM examResults WHERE exam_code = ?',
                [exam_code],
                (err, rows) => {
                    if(err) return reject(err);
                    resolve(rows);
                }
            );
        });
    }
}

module.exports = ExamResults;