const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// ================= REGISTER =================
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Лутфан ҳама майдонҳоро пур кунед'
            });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'Email аллакай вуҷуд дорад'
            });
        }

        // password plain → User model hash мекунад
        const user = await User.create({
            name,
            email,
            password
        });

        return res.status(201).json({
            success: true,
            token: generateToken(user._id),
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
};

// ================= LOGIN =================
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email ва password лозим аст'
            });
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Email ё password нодуруст аст'
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Email ё password нодуруст аст'
            });
        }

        return res.json({
            success: true,
            token: generateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('LOGIN ERROR:', error);
        return res.status(500).json({
            success: false,
            message: 'Хатои сервер ҳангоми login'
        });
    }
};

// ================= GET ME =================
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        return res.json({
            success: true,
            user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Хатои сервер'
        });
    }
};

// ================= UPDATE PROFILE =================
const updateProfile = async (req, res) => {
    try {
        const { name, phone, address, avatar } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Корбар ёфт нашуд'
            });
        }

        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (address) user.address = address;
        if (avatar) user.avatar = avatar;

        const updatedUser = await user.save();

        return res.json({
            success: true,
            message: 'Профил нав шуд',
            user: updatedUser
        });
    } catch (error) {
        console.error('UPDATE PROFILE ERROR:', error);
        return res.status(500).json({
            success: false,
            message: 'Хатои сервер ҳангоми навсозии профил'
        });
    }
};

module.exports = {
    register,
    login,
    getMe,
    updateProfile
};
