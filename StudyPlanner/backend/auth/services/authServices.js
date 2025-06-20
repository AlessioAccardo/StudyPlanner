const User = require('../models/user');

class AuthService {
    static async registerUser(userData) {
        try {
            // Controlla se l'username é gia in uso        
            const existingUser = await User.findByEmail(userData.email);
            if (existingUser) {
                throw new Error('Username gia in uso');
            }
            return await User.create(userData);
        } catch (error) {
            throw error;
        }
    }

    static async loginUser(email, password) {
        try {
            const user = await User.findByEmail(email);
            if (!user) {
                throw new Error('Credenziali non valide');
            }

            // check se la password é corretta
            const isMatch = await User.comparePassword(password, user.password);
            if (!isMatch) {
                throw new Error('Credenziali non valide');
            }

            // esclusione della password dalla risposta
            const { password: _, ...userWithoutPassword } = user;
            return userWithoutPassword;
        } catch (error) {
            throw error;
        }
    }

    static async verifyUser(userId) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('Utente non trovato');
            }
            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthService;