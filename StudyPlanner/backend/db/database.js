const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.log('Errore nella connessione al database:', err.message);
    } else {
        console.log('Connesso al database SQLite');

        db.run(`DROP TABLE IF EXISTS users`, (err) => {
            if (err) {
                console.error('Errore durante la cancellazione della tabella:', err.message);
            } else {
                console.log('Tabella users cancellata');
            }
        });

        db.run(`DROP TABLE IF EXISTS exam`, (err) => {
            if (err) {
                console.error('Errore durante la cancellazione della tabella:', err.message);
            } else {
                console.log('Tabella exam cancellata');
            }
        });

        db.run(`DROP TABLE IF EXISTS courses`, (err) => {
            if (err) {
                console.error('Errore durante la cancellazione della tabella:', err.message);
            } else {
                console.log('Tabella courses cancellata');
            }
        });

        db.run(`DROP TABLE IF EXISTS examResults`, (err) => {
            if (err) {
                console.error('Errore durante la cancellazione della tabella:', err.message);
            } else {
                console.log('Tabella examResults cancellata');
            }
        });

        db.run("PRAGMA foreign_keys = ON");

        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name VARCHAR(45) NOT NULL,
            last_name VARCHAR(45) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL CHECK (role IN ('student', 'professor', 'admin')),
            credits INTEGER,
            mean DECIMAL(4,2)
            )`);

        db.run(`CREATE TABLE IF NOT EXISTS courses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(255) NOT NULL,
            professor_id INTEGER NOT NULL,
            FOREIGN KEY (professor_id) REFERENCES users(id) ON DELETE CASCADE 
            )`);

        db.run(`CREATE TABLE IF NOT EXISTS exam (
            code INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(255) NOT NULL,
            credits INTEGER NOT NULL,
            course_id INTEGER NOT NULL,
            professor_id INTEGER NOT NULL,
            date DATETIME NOT NULL,
            approved BOOLEAN,
            max_students INTEGER,
            enrolled_students INTEGER DEFAULT 0,
            FOREIGN KEY (professor_id) REFERENCES users(id),
            FOREIGN KEY (course_id) REFERENCES courses(id)
        )`);

         db.run(`CREATE TABLE IF NOT EXISTS examResults (
            exam_code INTEGER,
            student_id INTEGER NOT NULL,
            grade INTEGER,
            accepted BOOLEAN,
            PRIMARY KEY (exam_code, student_id),
            FOREIGN KEY (exam_code) REFERENCES exam(code) ON DELETE NO ACTION,
            FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE NO ACTION
            )`);

    }
});


function insertUser(first_name, last_name, email, password, role, credits, mean) {
    if (role !== 'student') {
        credits = null;
        mean = null;
    } else  {
        credits = 0;
        mean = 0;
    }

    db.run(
        `INSERT INTO users (first_name, last_name, email, password, role, credits, mean) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [first_name, last_name, email, password, role, credits, mean],
        function(err) {
            if (err) {
                console.error('Errore durante l\'inserimento dell\'utente:', err.message);
            } else {
                console.log(`Utente inserito con ID: ${this.lastID}`);
            }
        }
    )
}


function getUsers() {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) {
            console.log('Errore durante la selezione degli utenti:', err.message);
        } else {
            rows.forEach(row => {
                console.log(row);
            })
        }
    })
}


function insertExam(name, credits, course_id, professor_id, date, approved, max_students) {
    const approvedValue = approved ? 1 : 0;

    db.run(`INSERT INTO exam (name, credits, course_id, professor_id, date, approved, max_students) VALUES (?,?,?,?,?,?,?)`, [name, credits, course_id, professor_id, date, approvedValue, max_students], (err, rows) => {
        if (err) {
            console.log('Error for inserting values in exam table: ', err.message);
        } else {
            rows.forEach(row => {
                console.log(row);
            })
        }
    })
}

function setGrade(student_id, exam_code, grade) {
    db.run(`UPDATE examResults SET grade = ? WHERE student_id = ? AND exam_code = ?`, [grade, student_id, exam_code], (err) => {
        if (err) {
            console.log('Error updating grade: ', err.message);
        } else {
           console.log(`Grade updated: student ${student_id}, exam ${exam_code}, grade = ${grade}`);
        }
    });
}


function acceptExam(student_id, exam_code, accept) {
    const acceptedValue = accept ? 1 : 0;

    db.run(`UPDATE examResults SET accepted = ? WHERE student_id = ? AND exam_code = ?`, [acceptedValue, student_id, exam_code], (err) => {
        if (err) {
            console.log('Error updating value of accepted exam: ', err.message);
        } else {
            console.log(`Exam updated: student ${student_id}, exam ${exam_code}, accepted = ${acceptedValue}`);
        }
    });
}

function getExamResults() {
     db.all(`SELECT * FROM examResults`, [], (err, rows) => {
        if (err) {
            console.log('Errore: ', err.message);
        } else {
        rows.forEach(row => {
            console.log(row);
        })
        }
    });
}

function getAcceptedExams(student_id) {
    db.all(`SELECT * FROM examResults WHERE student_id = (?) AND accepted = true`, [student_id], (err, rows) => {
        if (err) {
            console.log('Errore: ', err.message);
        } else {
        rows.forEach(row => {
            console.log(row);
        })
        }
    });
}

setTimeout(() => {
    insertUser('Mario', 'Rossi', 'sdcvsdcv', 'ciao', 'admin');
    getUsers();
    insertExam('prog', 6, 3, 2, '2025-06-13', true, 400);
    insertExam('web', 6, 3, 2, '2025-06-13', true, 400);
    getExamResults();
}, 10000);


module.exports = db;

