// importo il db
const db = require('../../db/database');

// importo il modulo bcryptjs per la gestione delle password
const bcrypt = require('bcryptjs');

// interagisce direttamente con il database per le operazioni CRUD sugli utenti
class User {

// definiamo il metodo per creare un nuovo utente
    static async create({ first_name, last_name, email, password, role }) {
        // verifica sul ruolo
        const ruoli = ['studente', 'admin', 'professore'];
        if (!ruoli.includes(role)) {
            throw new Error(`Ruolo non valido: ${role}`);
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // caso in cui sia studente
        if (role == "studente") {
            return new Promise((resolve, reject) => {    
                db.run(
                    'INSERT INTO users (first_name, last_name, email, password, role, credits, mean) VALUES (?,?,?,?,?,?,?)',
                    [first_name, last_name, email, hashedPassword, role, 0, 0],
                    function(err) {
                        if (err) return reject(err);
                        resolve({ id: this.lastID, first_name, last_name, email, role })
                    }
                );
            });
        // caso in cui non sia studente
        } else {
            return new Promise((resolve, reject) => {    
                db.run(
                    'INSERT INTO users (first_name, last_name, email, password, role) VALUES (?,?,?,?,?)',
                    [first_name, last_name, email, hashedPassword, role],
                    function(err) {
                        if (err) return reject(err);
                        resolve({ id: this.lastID, first_name, last_name, email, role })
                    }
                );
            });
        }
    }

    // ricerca utente per first_name
    static async findByFName(first_name) {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM users WHERE first_name = ?', [first_name], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    // ricerca per last_name
    static async findByLName(last_name) {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM users WHERE last_name = ?', [last_name], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    static async findById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT id, first_name, last_name, email FROM users WHERE id = ?', [id], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }

    static async findByEmail(email) {
        return new Promise((resolve, reject) => {
            db.get('SELECT id FROM users where email = ?', [email], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }

    static async comparePassword(candidatePassword, hash) {
        return bcrypt.compare(candidatePassword, hash);
    }
}

module.exports = User;