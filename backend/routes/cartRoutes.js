// backend/routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// ================= САНҶИШИ STOCK ПЕШ АЗ ИЛОВА КАРДАН =================
router.post('/cart/check-stock', async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Маҳсулот ёфт нашуд'
            });
        }

        if (!product.isActive) {
            return res.status(400).json({
                success: false,
                message: 'Маҳсулот дастрас нест'
            });
        }

        // Санҷиши stock
        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: `Фақат ${product.stock} дона дастрас аст`,
                availableStock: product.stock
            });
        }

        res.json({
            success: true,
            message: 'Дастрас аст',
            availableStock: product.stock
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// ================= САБТИ ФАРМОИШ (Order) =================
router.post('/orders', async (req, res) => {
    try {
        const { items } = req.body; // items = [{productId, quantity}, ...]

        // Санҷиши stock барои ҳар маҳсулот
        for (let item of items) {
            const product = await Product.findById(item.productId);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Маҳсулот ${item.productId} ёфт нашуд`
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `${product.name}: Фақат ${product.stock} дона дастрас аст`,
                    product: product.name,
                    available: product.stock
                });
            }
        }

        // Кам кардани stock
        for (let item of items) {
            await Product.findByIdAndUpdate(
                item.productId,
                {
                    $inc: { stock: -item.quantity },
                    updatedAt: new Date()
                }
            );
        }

        res.json({
            success: true,
            message: 'Фармоиш бо муваффақият сабт шуд'
        });

    } catch (error) {
        console.error('Хатогӣ дар сабти фармоиш:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;