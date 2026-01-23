// backend/routes/auth.js
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

        // Тафтиши майдонҳои зарурӣ
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Лутфан ҳамаи майдонҳоро пур кунед'
            });
        }

        // Тафтиши вуҷуди корбар
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'Ин email аллакай истифода шудааст'
            });
        }

        // Сохтани корбари нав
        const user = await User.create({
            name,
            email,
            password,
            phone
        });

        const token = generateToken(user._id);

        res.status(201).json({
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
        res.status(500).json({
            success: false,
            message: error.message
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

        // Ҷустуҷӯи корбар
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                success: false,
                message: 'Email ё рамз нодуруст аст'
            });
        }

        const token = generateToken(user._id);

        res.json({
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
        res.status(500).json({
            success: false,
            message: error.message
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

        res.json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   PUT /api/auth/update-profile
// @desc    Навсозии профил
// @access  Private
router.put('/update-profile', protect, async (req, res) => {
    try {
        const { name, phone, address } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name, phone, address },
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            message: 'Профил нав шуд',
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   PUT /api/auth/change-password
// @desc    Иваз кардани рамз
// @access  Private
router.put('/change-password', protect, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user._id).select('+password');

        if (!(await user.comparePassword(currentPassword))) {
            return res.status(401).json({
                success: false,
                message: 'Рамзи ҷорӣ нодуруст аст'
            });
        }

        user.password = newPassword;
        await user.save();

        res.json({
            success: true,
            message: 'Рамз иваз шуд'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;