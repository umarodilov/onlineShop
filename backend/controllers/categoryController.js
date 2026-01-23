// controllers/categoryController.js
import Category from '../models/Category.js';

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ isActive: true });
        res.json({
            success: true,
            categories
        });
    } catch (error) {
        console.error('Category error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
