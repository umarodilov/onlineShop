const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Product = require('../models/Product');

// @route   GET /api/categories
// @desc    Фақат категорияҳое, ки маҳсулот доранд (ObjectId based)
// @access  Public
router.get('/', async (req, res) => {
    try {
        // 1️⃣ гирифтани categoryId-ҳое ки дар products ҳастанд
        const usedCategoryIds = await Product.distinct('category', {
            isActive: true
        });

        // 2️⃣ гирифтани худи категорияҳо
        const categories = await Category.find({
            _id: { $in: usedCategoryIds },
            isActive: true
        })
            .sort({ name: 1 })
            .select('_id name slug');

        res.json({
            success: true,
            categories
        });
    } catch (error) {
        console.error('Categories error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

module.exports = router;

// // backend/routes/categories.js
// const express = require('express');
// const router = express.Router();
// const Category = require('../models/Category');
// const { protect, admin } = require('../middleware/auth');
//
// // @route   GET /api/categories
// // @desc    Гирифтани ҳамаи категорияҳо
// // @access  Public
// // backend/routes/categories.js
// // backend/routes/categories.js
// router.get('/', async (req, res) => {
//     try {
//         const categories = await Category.aggregate([
//             { $match: { isActive: true } },
//
//             {
//                 $lookup: {
//                     from: 'products',
//                     localField: '_id',        // ✅ category._id
//                     foreignField: 'category', // ✅ product.category
//                     as: 'products'
//                 }
//             },
//
//             {
//                 $addFields: {
//                     productCount: { $size: '$products' }
//                 }
//             },
//
//             // ❗ танҳо категорияҳое ки маҳсулот доранд
//             {
//                 $match: {
//                     productCount: { $gt: 0 }
//                 }
//             },
//
//             {
//                 $project: {
//                     products: 0
//                 }
//             },
//
//             { $sort: { name: 1 } }
//         ]);
//
//         res.json({
//             success: true,
//             categories
//         });
//     } catch (error) {
//         console.error('Categories error:', error);
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// });
//
//
// // router.get('/', async (req, res) => {
// //     try {
// //         const categories = await Category.find({ isActive: true })
// //             .populate('parent', 'name slug')
// //             .sort('name');
// //
// //         res.json({
// //             success: true,
// //             categories
// //         });
// //     } catch (error) {
// //         res.status(500).json({
// //             success: false,
// //             message: error.message
// //         });
// //     }
// // });
//
// // @route   GET /api/categories/:id
// // @desc    Гирифтани як категория
// // @access  Public
// router.get('/:id', async (req, res) => {
//     try {
//         const category = await Category.findById(req.params.id)
//             .populate('parent', 'name slug');
//
//         if (!category) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Категория ёфт нашуд'
//             });
//         }
//
//         res.json({
//             success: true,
//             category
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// });
//
// // @route   POST /api/categories
// // @desc    Илова кардани категория (Admin)
// // @access  Private/Admin
// router.post('/', protect, admin, async (req, res) => {
//     try {
//         const { name, description, image, parent } = req.body;
//
//         if (!name) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Номи категория зарур аст'
//             });
//         }
//
//         // Тафтиши вуҷуди категория бо ҳамин ном
//         const existingCategory = await Category.findOne({ name });
//         if (existingCategory) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Категория бо ин ном аллакай вуҷуд дорад'
//             });
//         }
//
//         const category = await Category.create({
//             name,
//             description,
//             image,
//             parent: parent || null
//         });
//
//         res.status(201).json({
//             success: true,
//             message: 'Категория илова шуд',
//             category
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// });
//
// // @route   GET /api/categories/with-products
// // @desc    Категорияҳое, ки маҳсулот доранд
// // @access  Public
// router.get('/with-products', async (req, res) => {
//     try {
//         const categories = await Category.aggregate([
//             {
//                 $match: { isActive: true }
//             },
//             {
//                 $lookup: {
//                     from: 'products',          // collection name
//                     localField: 'name',        // Category.name
//                     foreignField: 'category',  // Product.category (string)
//                     as: 'products'
//                 }
//             },
//             {
//                 $addFields: {
//                     productCount: { $size: '$products' }
//                 }
//             },
//             {
//                 $match: {
//                     productCount: { $gt: 0 }
//                 }
//             },
//             {
//                 $project: {
//                     products: 0
//                 }
//             },
//             {
//                 $sort: { name: 1 }
//             }
//         ]);
//
//         res.json({
//             success: true,
//             categories
//         });
//     } catch (error) {
//         console.error('Category with products error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Server error'
//         });
//     }
// });
//
// // @route   PUT /api/categories/:id
// // @desc    Навсозии категория (Admin)
// // @access  Private/Admin
// router.put('/:id', protect, admin, async (req, res) => {
//     try {
//         const { name, description, image, parent, isActive } = req.body;
//
//         const category = await Category.findByIdAndUpdate(
//             req.params.id,
//             { name, description, image, parent, isActive },
//             { new: true, runValidators: true }
//         );
//
//         if (!category) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Категория ёфт нашуд'
//             });
//         }
//
//         res.json({
//             success: true,
//             message: 'Категория нав шуд',
//             category
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// });
//
// // @route   DELETE /api/categories/:id
// // @desc    Нест кардани категория (Admin)
// // @access  Private/Admin
// router.delete('/:id', protect, admin, async (req, res) => {
//     try {
//         const category = await Category.findByIdAndDelete(req.params.id);
//
//         if (!category) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Категория ёфт нашуд'
//             });
//         }
//
//         res.json({
//             success: true,
//             message: 'Категория нест шуд'
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// });
//
// module.exports = router;