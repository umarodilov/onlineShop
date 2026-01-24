// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();

const User = require('../models/User');
const { generateToken, protect } = require('../middleware/auth');

// @route   POST /api/auth/register
// @desc    Бақайдгирии корбар
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Лутфан ҳамаи майдонҳоро пур кунед'
            });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'Ин email аллакай истифода шудааст'
            });
        }

        // ✅ password plain — User model pre('save') худаш hash мекунад
        const user = await User.create({
            name,
            email,
            password,
            phone
        });

        const token = generateToken(user._id);

        return res.status(201).json({
            success: true,
            message: 'Бақайдгирӣ бо муваффақият анҷом ёфт',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('REGISTER ERROR:', error);
        return res.status(500).json({
            success: false,
            message: 'Хатои сервер ҳангоми register'
        });
    }
});

// @route   POST /api/auth/login
// @desc    Воридшавӣ
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email ва рамзро ворид кунед'
            });
        }

        // ✅ чун password select:false шудааст
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Email ё рамз нодуруст аст'
            });
        }

        const ok = await user.comparePassword(password);
        if (!ok) {
            return res.status(401).json({
                success: false,
                message: 'Email ё рамз нодуруст аст'
            });
        }

        const token = generateToken(user._id);

        return res.json({
            success: true,
            message: 'Воридшавӣ муваффақ',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            }
        });
    } catch (error) {
        console.error('LOGIN ERROR:', error);
        return res.status(500).json({
            success: false,
            message: 'Хатои сервер ҳангоми login'
        });
    }
});

// @route   GET /api/auth/me
// @desc    Гирифтани маълумоти корбари ҷорӣ
// @access  Private
router.get('/me', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate('cart.product')
            .populate('wishlist');

        return res.json({
            success: true,
            user
        });
    } catch (error) {
        console.error('ME ERROR:', error);
        return res.status(500).json({
            success: false,
            message: 'Хатои сервер'
        });
    }
});

// @route   PUT /api/auth/update-profile
// @desc    Навсозии профил
// @access  Private
router.put('/update-profile', protect, async (req, res) => {
    try {
        const { name, phone, address, avatar } = req.body;

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Корбар ёфт нашуд'
            });
        }

        // ✅ танҳо чизҳои фиристодаро нав мекунем
        if (name !== undefined) user.name = name;
        if (phone !== undefined) user.phone = phone;
        if (address !== undefined) user.address = address;
        if (avatar !== undefined) user.avatar = avatar;

        const saved = await user.save();

        return res.json({
            success: true,
            message: 'Профил нав шуд',
            user: saved
        });
    } catch (error) {
        console.error('UPDATE PROFILE ERROR:', error);
        return res.status(500).json({
            success: false,
            message: 'Хатои сервер ҳангоми навсозии профил'
        });
    }
});

// @route   PUT /api/auth/change-password
// @desc    Иваз кардани рамз
// @access  Private
router.put('/change-password', protect, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'currentPassword ва newPassword лозим аст'
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Рамзи нав бояд камаш аз 6 аломат бошад'
            });
        }

        const user = await User.findById(req.user._id).select('+password');

        const ok = await user.comparePassword(currentPassword);
        if (!ok) {
            return res.status(401).json({
                success: false,
                message: 'Рамзи ҷорӣ нодуруст аст'
            });
        }

        // ✅ password plain → pre('save') hash мекунад
        user.password = newPassword;
        await user.save();

        return res.json({
            success: true,
            message: 'Рамз иваз шуд'
        });
    } catch (error) {
        console.error('CHANGE PASSWORD ERROR:', error);
        return res.status(500).json({
            success: false,
            message: 'Хатои сервер ҳангоми иваз кардани рамз'
        });
    }
});

module.exports = router;
