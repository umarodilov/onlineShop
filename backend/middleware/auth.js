// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Тафтиши токен
exports.protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Барои дастрасӣ токен зарур аст'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Корбар ёфт нашуд'
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Токен нодуруст аст'
        });
    }
};

// Тафтиши нақши админ
exports.admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: 'Шумо админ нестед'
        });
    }
};

// Генератсияи токен
exports.generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key', {
        expiresIn: '30d'
    });
};