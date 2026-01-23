// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// .env танҳо барои локал; дар Render Environment Variables истифода мешавад
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ ДУРУСТ: аз MONGODB_URI мехонем
const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
    console.error('❌ MONGODB_URI is missing. Add it in Render Environment Variables.');
    process.exit(1);
}

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Routes
const authRoutes = require('./routes/auth');
const ordersRoutes = require('./routes/orders');
const usersRoutes = require('./routes/users');
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const contactRoutes = require('./routes/contactRoutes');
const cartRoutes = require('./routes/cartRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api', contactRoutes);
app.use('/api', cartRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', time: new Date().toISOString() });
});

// 404
app.use((req, res) => {
    res.status(404).json({ message: 'Route ёфт нашуд', path: req.originalUrl });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('❌ Server error:', err);
    res.status(500).json({ message: 'Хатои сервер' });
});

// Mongo + start server
console.log('ENV MONGODB_URI:', process.env.MONGODB_URI ? 'SET' : 'NOT SET');

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB connected');

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Mongo error:', err);
        process.exit(1);
    });
