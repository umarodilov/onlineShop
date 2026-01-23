// models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Ном ҳатмист'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email ҳатмист'],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Email нодуруст аст']
    },
    subject: {
        type: String,
        required: [true, 'Мавзӯъ ҳатмист'],
        enum: ['order', 'product', 'payment', 'delivery', 'complaint', 'suggestion', 'other']
    },
    message: {
        type: String,
        required: [true, 'Паём ҳатмист'],
        minlength: [10, 'Паём бояд камаш 10 ҳарф бошад']
    },
    status: {
        type: String,
        enum: ['new', 'read', 'replied', 'closed'],
        default: 'new'
    },
    reply: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    repliedAt: {
        type: Date,
        default: null
    }
});

// Index барои тезтар ёфтан
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Contact', contactSchema);