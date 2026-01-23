// backend/routes/products.js

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');

router.get('/search', async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.trim().length < 2) {
            return res.json({ success: true, data: [] });
        }

        const regex = new RegExp(q.trim(), 'i');

        // 1️⃣ Ёфтани category-ҳо
        const categories = await Category.find({ name: regex });
        const categoryIds = categories.map(c => c._id);

        // 2️⃣ Ёфтани продуктҳо
        const products = await Product.find({
            isActive: true,
            $or: [
                { name: regex },
                { description: regex },
                { brand: regex },
                { category: { $in: categoryIds } }
            ]
        })
            .populate('category', 'name')
            .limit(20);

        res.json({ success: true, data: products });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Хатогӣ дар сервер',
            error: err.message
        });
    }
});


// ================= GET ALL PRODUCTS =================
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({ isActive: true });

        res.json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// ================= GET SINGLE PRODUCT =================
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Продукт ёфт нашуд'
            });
        }

        res.json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
