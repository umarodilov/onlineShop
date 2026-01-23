const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

// ================= REGISTER =================
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Тафтиши майдонҳои ҳатмӣ
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Лутфан ҳама майдонҳоро пур кунед' });
        }

        // Тафтиши вуҷуд доштани корбар
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'Email аллакай вуҷуд дорад' });
        }

        // Хеш кардани password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Эҷоди корбар
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // Ҷавоб бо токен
        res.status(201).json({
            success: true,
            token: generateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role || 'user'
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ================= LOGIN =================
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email ва password лозим аст' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ success: false, message: 'Email ё password нодуруст аст' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Email ё password нодуруст аст' });
        }

        res.json({
            success: true,
            token: generateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role || 'user'
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { register, login };



// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const generateToken = require('../utils/generateToken');
//
// const register = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//
//         const userExists = await User.findOne({ email });
//         if (userExists) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'User already exists'
//             });
//         }
//
//         const user = await User.create({
//             name,
//             email,
//             password
//         });
//
//         res.status(201).json({
//             success: true,
//             token: generateToken(user._id),
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role
//             }
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };
//
// module.exports = { register };
//
//
// // // backend/controllers/authController.js
// // const User = require('../models/User');
// // const { generateToken } = require('../middleware/auth');
// //
// // // 📌 REGISTER
// // exports.register = async (req, res) => {
// //     try {
// //         const { name, email, password } = req.body;
// //
// //         const userExists = await User.findOne({ email });
// //         if (userExists) {
// //             return res.status(400).json({ message: 'Email мавҷуд аст' });
// //         }
// //
// //         const user = await User.create({
// //             name,
// //             email,
// //             password
// //         });
// //
// //         res.status(201).json({
// //             _id: user._id,
// //             name: user.name,
// //             email: user.email,
// //             token: generateToken(user._id)
// //         });
// //
// //     } catch (err) {
// //         res.status(500).json({ message: err.message });
// //     }
// // };
// //
// // // 📌 LOGIN
// // exports.login = async (req, res) => {
// //     const { email, password } = req.body;
// //
// //     const user = await User.findOne({ email });
// //
// //     if (user && await user.matchPassword(password)) {
// //         res.json({
// //             _id: user._id,
// //             name: user.name,
// //             email: user.email,
// //             token: generateToken(user._id)
// //         });
// //     } else {
// //         res.status(401).json({ message: 'Email ё пароль хато' });
// //     }
// // };
