const AuthService = require('../services/authServices');

class AuthController {
    static async register(req, res) {
        try {
            const user = await AuthService.registerUser(req.body);
            res.status(201).json({
                success: true,
                data: user
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
            const user = await AuthService.loginUser(email, password);
            res.json({
                success: true,
                data: user
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
        
    }
}