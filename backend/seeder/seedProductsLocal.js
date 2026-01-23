// backend/seeder/seedProductsLocal.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const Product = require('../models/Product');
const Category = require('../models/Category');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/onlineShop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const seedProducts = async () => {
    try {
        // -- Ба база нигоҳ кунед (ихтиёрӣ)

        // -- Расмҳо аз папка
        const imagesDir = path.join(__dirname, '../public/images/products');
        const imageFiles = fs.readdirSync(imagesDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

        if (!imageFiles.length) {
            console.log('Расмҳои маҳсулот дар папкаи public/images/products вуҷуд надоранд!');
            process.exit();
        }

        // -- Маҳсулотҳои намунавӣ
        const productsData = [];
        const totalProducts = 30; // мисол, 30 маҳсулот
        for (let i = 0; i < totalProducts; i++) {
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];

            const product = {
                name: `Маҳсулот №${i + 1}`,
                description: `Тавсифи маҳсулот №${i + 1}`,
                price: Math.floor(Math.random() * 1000) + 50,
                stock: Math.floor(Math.random() * 50) + 1,
                mainImage: `/images/products/${randomImage}`,
                images: [`/images/products/${randomImage}`],
                category: randomCategory._id, // ObjectId-и категория
                brand: `Бренд ${i % 5 + 1}`,
                rating: parseFloat((Math.random() * 5).toFixed(1)),
                numReviews: Math.floor(Math.random() * 20),
                isFeatured: Math.random() < 0.3,
                isActive: true,
            };

            productsData.push(product);
        }

        const createdProducts = await Product.insertMany(productsData);
        console.log(`Ҳамаи маҳсулотҳо бо расмҳо навсозӣ шуданд! Маҳсулотҳо: ${createdProducts.length}`);

        process.exit();
    } catch (err) {
        console.error('Seed Products error:', err);
        process.exit(1);
    }
};

seedProducts();
