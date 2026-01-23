// backend/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Ном зарур аст'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email зарур аст'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email нодуруст аст']
    },
    password: {
        type: String,
        required: [true, 'Рамз зарур аст'],
        minlength: [6, 'Рамз бояд камаш аз 6 аломат бошад']
    },
    phone: {
        type: String,
        trim: true
    },
    address: {
        street: String,
        city: String,
        postalCode: String,
        country: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    avatar: {
        type: String,
        default: 'https://via.placeholder.com/150'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    cart: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 1,
            min: 1
        }
    }]
}, {
    timestamps: true
});

// МУҲИМ: Middleware барои hash кардани рамз
userSchema.pre('save', async function(next) {
    // Агар рамз иваз нашудааст, давом диҳед
    if (!this.isModified('password')) {
        return next();
    }

    try {
        // Hash кардани рамз
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Муқоисаи рамз
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        return false;
    }
};


userSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

module.exports = mongoose.model('User', userSchema);
