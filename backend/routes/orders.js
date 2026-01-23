// backend/routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');

// @route   POST /api/orders
// @desc    Сохтани фармоиши нав
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const {
            items,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        } = req.body;

        // САНҶИШ: Чӣ гирифта шуд
        console.log('📦 Дархости фармоиш гирифта шуд:');
        console.log('   User ID:', req.user?._id);
        console.log('   Items:', items);
        console.log('   Items length:', items?.length);
        console.log('   Shipping Address:', shippingAddress);
        console.log('   Customer Name:', shippingAddress?.fullName);
        console.log('   Total Price:', totalPrice);

        // Санҷиши маълумоти зарурӣ (нармтар)
        if (!items || !Array.isArray(items) || items.length === 0) {
            console.log('❌ Items нодуруст:', items);
            return res.status(400).json({
                success: false,
                message: 'Маҳсулот интихоб накардаед',
                debug: { items, type: typeof items }
            });
        }

        if (!shippingAddress) {
            console.log('❌ ShippingAddress нест');
            return res.status(400).json({
                success: false,
                message: 'Маълумоти суроға зарур аст',
                debug: { shippingAddress }
            });
        }

        if (!shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.street) {
            console.log('❌ Маълумоти суроға нопурра:', shippingAddress);
            return res.status(400).json({
                success: false,
                message: 'Маълумоти суроға нопурра аст',
                debug: {
                    hasName: !!shippingAddress.fullName,
                    hasPhone: !!shippingAddress.phone,
                    hasStreet: !!shippingAddress.street
                }
            });
        }

        // Санҷиши захира
        for (let item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Маҳсулот ${item.name} ёфт нашуд`
                });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Захираи кофӣ барои ${product.name} нест. Дар захира: ${product.stock}`
                });
            }
        }

        // Сохтани фармоиш
        const order = new Order({
            user: req.user._id,
            items: items,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod || 'cash',
            paymentStatus: 'pending',
            itemsPrice: itemsPrice,
            shippingPrice: shippingPrice || 0,
            taxPrice: taxPrice || 0,
            totalPrice: totalPrice,
            status: 'pending'
        });

        const createdOrder = await order.save();

        console.log('✅ Фармоиш сохта шуд:', createdOrder.orderNumber);

        // Кам кардани захира ва зиёд кардани фурӯш
        for (let item of items) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: { stock: -item.quantity, sold: item.quantity }
            });
        }

        res.status(201).json({
            success: true,
            message: 'Фармоиш бо муваффақият сохта шуд',
            order: createdOrder
        });
    } catch (error) {
        console.error('❌ Хатогӣ дар сохтани фармоиш:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Хатогӣ дар сохтани фармоиш'
        });
    }
});

// @route   GET /api/orders/my-orders
// @desc    Фармоишҳои корбари ҷорӣ
// @access  Private
router.get('/my-orders', protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate('items.product', 'name mainImage')
            .sort('-createdAt');

        res.json({
            success: true,
            orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   GET /api/orders/:id
// @desc    Гирифтани як фармоиш
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email phone')
            .populate('items.product', 'name mainImage');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Фармоиш ёфт нашуд'
            });
        }

        // Тафтиш, ки фармоиш ба корбар тааллуқ дорад ё не
        if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Шумо иҷозати дастрасӣ надоред'
            });
        }

        res.json({
            success: true,
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   GET /api/orders
// @desc    Ҳамаи фармоишҳо (Admin)
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;

        const filter = {};
        if (status) filter.status = status;

        const orders = await Order.find(filter)
            .populate('user', 'name email')
            .sort('-createdAt')
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Order.countDocuments(filter);

        res.json({
            success: true,
            orders,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page),
            total: count
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   PUT /api/orders/:id/status
// @desc    Иваз кардани статуси фармоиш (Admin)
// @access  Private/Admin
router.put('/:id/status', protect, admin, async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Фармоиш ёфт нашуд'
            });
        }

        order.status = status;

        if (status === 'delivered') {
            order.deliveredAt = Date.now();
            order.paymentStatus = 'paid';
        } else if (status === 'cancelled') {
            order.cancelledAt = Date.now();

            // Баргардонидани захира
            for (let item of order.items) {
                await Product.findByIdAndUpdate(item.product, {
                    $inc: { stock: item.quantity, sold: -item.quantity }
                });
            }
        }

        await order.save();

        res.json({
            success: true,
            message: 'Статуси фармоиш иваз шуд',
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   PUT /api/orders/:id/cancel
// @desc    Бекор кардани фармоиш
// @access  Private
router.put('/:id/cancel', protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Фармоиш ёфт нашуд'
            });
        }

        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Иҷозат дода нашудааст'
            });
        }

        if (order.status === 'delivered') {
            return res.status(400).json({
                success: false,
                message: 'Фармоиши таҳвилдодашударо бекор кардан мумкин нест'
            });
        }

        order.status = 'cancelled';
        order.cancelledAt = Date.now();

        // Баргардонидани захира
        for (let item of order.items) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: { stock: item.quantity, sold: -item.quantity }
            });
        }

        await order.save();

        res.json({
            success: true,
            message: 'Фармоиш бекор шуд',
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
