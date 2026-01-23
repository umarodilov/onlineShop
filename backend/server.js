const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const MONGO_URI =
    process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/onlineShop';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

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

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', time: new Date().toISOString() });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route ёфт нашуд' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Хатои сервер' });
});

mongoose.connect(MONGO_URI)
    .then(() => {
      console.log('✅ MongoDB connected');
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
      });
    })
    .catch(err => {
      console.error('❌ Mongo error:', err);
      process.exit(1);
    });



// // backend/server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const path = require('path');
//
// dotenv.config();
//
// const app = express();
// const PORT = process.env.PORT || 5000;
// const MONGO_URI =
//     process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/onlineShop';
//
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/images', express.static(path.join(__dirname, 'public/images')));
// app.use('/images', express.static('public/images'));
//
//
// const authRoutes = require('./routes/auth');
// const ordersRoutes = require('./routes/orders');
// const usersRoutes = require('./routes/users');
// const categoriesRoutes = require('./routes/categories');
// const productsRoutes = require('./routes/products');
// const contactRoutes = require('./routes/contactRoutes');
// const cartRoutes = require('./routes/cartRoutes');
//
//
// app.use('/api/auth', authRoutes);
// app.use('/api/orders', ordersRoutes);
// app.use('/api/users', usersRoutes);
// app.use('/api/categories', categoriesRoutes);
// app.use('/api/products', productsRoutes);
// app.use('/api', contactRoutes);
// app.use('/api', cartRoutes);
//
// app.get('/api/health', (req, res) => {
//   res.json({
//     status: 'OK',
//     message: 'Сервер кор мекунад',
//     time: new Date().toISOString()
//   });
// });
//
//
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route ёфт нашуд',
//     path: req.originalUrl
//   });
// });
//
//
// app.use((err, req, res, next) => {
//   console.error('❌ Хатои сервер:', err);
//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message || 'Хатои сервер'
//   });
// });
//
//
// mongoose
//     .connect(MONGO_URI)
//     .then(() => {
//       console.log('✅ MongoDB connected');
//
//       app.listen(PORT, () => {
//         console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
//         console.log(`🚀 Сервер дар порти ${PORT} оғоз ёфт`);
//         console.log(`📍 Сайт: http://localhost:${PORT}`);
//         console.log(`🔌 API:  http://localhost:${PORT}/api`);
//         console.log('🗄️  MongoDB: Пайваст');
//         console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
//         console.log('📋 Дастрас routes:');
//         console.log('   POST /api/auth/register');
//         console.log('   POST /api/auth/login');
//         console.log('   GET  /api/users');
//         console.log('   GET  /api/categories');
//         console.log('   GET  /api/orders');
//         console.log('   GET  /api/health\n');
//       });
//     })
//     .catch(err => {
//       console.error('❌ MongoDB пайваст нашуд:', err);
//       process.exit(1);
//     });
//
