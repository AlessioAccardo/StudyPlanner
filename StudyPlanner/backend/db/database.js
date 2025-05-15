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


        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL CHECK (role IN ('student', 'professor', 'admin')),
            credits INTEGER,
            mean DECIMAL(4,2)
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

setTimeout(() => {
    insertUser('Mario', 'Rossi', 'sdcvsdcv', 'ciao', 'admin');
    getUsers();
}, 1000);

module.exports = db;

