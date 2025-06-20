const AuthService = require('../services/authServices');

class AuthController {
    static async register(req, res) {
        try {
            const { user, token } = await AuthService.registerUser(req.body);
            res.status(201).json({
                success: true,
                data: user,
                token
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const { user, token } = await AuthService.loginUser(email, password);
            res.json({
                success: true,
                data: user,
                token
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    static async verify(req, res) {
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token || AuthService.isTokenBlackListed(token)) {
                return res.status(401).json({ success: false, message: "Token non valido" });
            }
        
            const user = await AuthService.verifyUser(req.user.id);
            res.json({
                success: true,
                data: user
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message
            })
        }
    }

    static logout(req, res) {
        const token = req.headers['authorization']?.split(' ')[1];
        if (token) {
            AuthService.logoutUser(token);
        }
        res.json({
            success: true,
            message: "Logout effettuato correttamente"
        });
    }
}

module.exports = AuthController;