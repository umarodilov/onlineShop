// backend/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth');

// @route   GET /api/users
// @desc    Гирифтани ҳамаи корбарон (Admin)
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const users = await User.find({}).select('-password');

        res.json({
            success: true,
            users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   GET /api/users/:id
// @desc    Гирифтани як корбар (Admin)
// @access  Private/Admin
router.get('/:id', protect, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Корбар ёфт нашуд'
            });
        }

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

// @route   PUT /api/users/:id
// @desc    Навсозии корбар (Admin)
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const { name, email, role, isVerified } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, role, isVerified },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Корбар ёфт нашуд'
            });
        }

        res.json({
            success: true,
            message: 'Корбар нав шуд',
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   DELETE /api/users/:id
// @desc    Нест кардани корбар (Admin)
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Корбар ёфт нашуд'
            });
        }

        res.json({
            success: true,
            message: 'Корбар нест шуд'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   POST /api/users/:id/cart
// @desc    Илова кардан ба сабад
// @access  Private
router.post('/:id/cart', protect, async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Корбар ёфт нашуд'
            });
        }

        // Тафтиш ки корбар худ ё админ аст
        if (user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Иҷозат дода нашудааст'
            });
        }

        const cartItem = user.cart.find(item => item.product.toString() === productId);

        if (cartItem) {
            cartItem.quantity += quantity || 1;
        } else {
            user.cart.push({ product: productId, quantity: quantity || 1 });
        }

        await user.save();

        res.json({
            success: true,
            message: 'Ба сабад илова шуд',
            cart: user.cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   DELETE /api/users/:id/cart/:productId
// @desc    Нест кардан аз сабад
// @access  Private
router.delete('/:id/cart/:productId', protect, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Корбар ёфт нашуд'
            });
        }

        // Тафтиш ки корбар худ ё админ аст
        if (user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Иҷозат дода нашудааст'
            });
        }

        user.cart = user.cart.filter(
            item => item.product.toString() !== req.params.productId
        );

        await user.save();

        res.json({
            success: true,
            message: 'Аз сабад нест шуд',
            cart: user.cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
