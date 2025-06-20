const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbFile = path.join(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
        console.log(`Errore nella connessione al database`);
    } else {
        db.serialize(() => {
            db.run('PRAGMA foreign_keys = ON;', (err) => {
                if (err) {
                    console.log(`Errore nell'attivazione delle foreign keys:`, err);
                } else {
                    console.log('Foreign key support attivato!');
                }
            });
            db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                first_name VARCHAR(45) NOT NULL,
                last_name VARCHAR(45) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(45) NOT NULL,
                credits INT,
                mean DECIMAL(4,2)    
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS courses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(45) NOT NULL,
                professor_id INTEGER NOT NULL,
                FOREIGN KEY (professor_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE NO ACTION
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS exams (
                code INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(255) NOT NULL,
                credits INTEGER NOT NULL,
                max_students INTEGER,
                enrolled_students INTEGER,
                professor_id INTEGER NOT NULL,
                approved BOOLEAN NOT NULL CHECK(approved IN (0,1)) DEFAULT 0,
                date DATETIME NOT NULL,
                course_id INT NOT NULL,
                FOREIGN KEY (professor_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE NO ACTION,
                FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE ON UPDATE NO ACTION
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS examResults (
                exam_code INTEGER NOT NULL,
                student_id INTEGER NOT NULL,
                grade INTEGER,
                accepted BOOLEAN NOT NULL CHECK(accepted IN (0,1)) DEFAULT 0,
                PRIMARY KEY (exam_code, student_id)
                FOREIGN KEY (exam_code) REFERENCES exams(code) ON DELETE CASCADE ON UPDATE NO ACTION,
                FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE NO ACTION
            )`);
        })
    }
})

module.exports = db;