// backend/seeder/seedImages.js
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('../models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/onlineShop';

// -------------------- Category ID -> Префикси расм --------------------
const categoryImages = {
    '696068ee038f090678009c4f': 'electronics',  // Электроника
    '696068ee038f090678009c50': 'clothes',       // Либос
    '696068ee038f090678009c51': 'books',         // Китобҳо
    '6960691edfc6ffa8ba3f204e': 'vegetables',    // Сабзавотҳо
    '69606a6bd1b6f4a4d65949ee': 'furniture'      // Мебел
};

const imageCount = {
    'electronics': 20,
    'clothes': 20,
    'books': 20,
    'vegetables': 19,
    'furniture': 19
};

// -------------------- Скрипт --------------------
const seedProductsLocal = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ MongoDB пайваст шуд');

        const products = await Product.find({ isActive: true });
        console.log(`📦 Маҳсулотҳои ёфтшуда: ${products.length}`);

        if (products.length === 0) {
            console.log('❌ Маҳсулот дар база нест!');
            console.log('💡 Аввал иҷро кунед: node seeder/seedProducts.js');
            await mongoose.disconnect();
            return;
        }

        let updated = 0;
        let skipped = 0;

        for (let product of products) {
            // Гирифтани category ID ҳамчун String
            const categoryId = product.category.toString();
            const prefix = categoryImages[categoryId];

            if (!prefix) {
                console.log(`⚠️  Категория ${categoryId} дар mapping ёфт нашуд: ${product.name}`);
                skipped++;
                continue;
            }

            // Интихоби расми тасодуфӣ
            const totalImages = imageCount[prefix];
            const randomIndex = Math.floor(Math.random() * totalImages) + 1;
            const fileName = `${prefix}${randomIndex}.jpg`;

            // Path: public/images/products/books/books5.jpg
            const filePath = path.join(
                __dirname,
                '..',
                'public',
                'images',
                'products',
                prefix,
                fileName
            );

            // Санҷиш
            if (!fs.existsSync(filePath)) {
                console.log(`❌ Файл ёфт нашуд: ${filePath}`);
                skipped++;
                continue;
            }

            // Сохт
            product.mainImage = `/images/products/${prefix}/${fileName}`;
            await product.save();

            console.log(`✅ ${product.name} -> ${prefix}/${fileName}`);
            updated++;
        }

        console.log('\n📊 Хулоса:');
        console.log(`   ✅ Навсозӣ: ${updated}`);
        console.log(`   ⚠️  Гузашт: ${skipped}`);
        console.log('\n🎉 Тамом!');

        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error('❌ Хатогӣ:', err.message);
        console.error(err.stack);
        await mongoose.disconnect();
        process.exit(1);
    }
};

seedProductsLocal();

// // backend/seeder/seedImages.js
// const fs = require('fs');
// const path = require('path');
// const mongoose = require('mongoose');
// require('dotenv').config();
//
// const Product = require('../models/Product');
//
// // -------------------- MongoDB Connection --------------------
// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/onlineShop';
//
// // -------------------- Mapping: Префикси файл -> Номи категория --------------------
// const categoryMapping = {
//     'electronics': 'Электроника',
//     'clothes': 'Либос',
//     'books': 'Китобҳо',
//     'vegetables': 'Сабзавотҳо',
//     'furniture': 'Мебел'
// };
//
// // Ҳар категория чанд расм дорад
// const imageCount = {
//     'electronics': 20,
//     'clothes': 20,
//     'books': 20,
//     'vegetables': 20,
//     'furniture': 20
// };
//
// // -------------------- Скрипти асосӣ --------------------
// const seedProductsLocal = async () => {
//     try {
//         await mongoose.connect(MONGO_URI);
//         console.log('✅ MongoDB пайваст шуд');
//
//         const products = await Product.find({ isActive: true });
//         console.log(`📦 Маҳсулотҳои ёфтшуда: ${products.length}`);
//
//         if (products.length === 0) {
//             console.log('❌ Маҳсулот дар база нест!');
//             await mongoose.disconnect();
//             return;
//         }
//
//         let updated = 0;
//         let skipped = 0;
//
//         for (let product of products) {
//             // Муайян кардани категория
//             const categoryName = typeof product.category === 'string'
//                 ? product.category
//                 : product.category?.name;
//
//             // Ёфтани prefix аз categoryMapping
//             let prefix = null;
//             for (let [key, value] of Object.entries(categoryMapping)) {
//                 if (value === categoryName) {
//                     prefix = key;
//                     break;
//                 }
//             }
//
//             if (!prefix) {
//                 console.log(`⚠️  Категория "${categoryName}" дар mapping ёфт нашуд, гузашт: ${product.name}`);
//                 skipped++;
//                 continue;
//             }
//
//             // Интихоби тасодуфии расм
//             const totalImages = imageCount[prefix];
//             const randomIndex = Math.floor(Math.random() * totalImages) + 1;
//             const fileName = `${prefix}${randomIndex}.jpg`;
//
//             // ⭐ ДИҚҚАТ: Path бо зерпапка
//             // Мисол: public/images/products/books/books5.jpg
//             const filePath = path.join(
//                 __dirname,
//                 '..',
//                 'public',
//                 'images',
//                 'products',
//                 prefix,           // ⭐ Зерпапка (books, electronics, ...)
//                 fileName
//             );
//
//             // Санҷиши мавҷудияти файл
//             if (!fs.existsSync(filePath)) {
//                 console.log(`❌ Файл ёфт нашуд: ${filePath}`);
//                 skipped++;
//                 continue;
//             }
//
//             // ⭐ Навсозии mainImage бо зерпапка
//             product.mainImage = `/images/products/${prefix}/${fileName}`;
//             await product.save();
//
//             console.log(`✅ Сохт: ${product.name} -> ${prefix}/${fileName} (${categoryName})`);
//             updated++;
//         }
//
//         console.log('\n📊 Хулоса:');
//         console.log(`   ✅ Навсозӣ шуд: ${updated}`);
//         console.log(`   ⚠️  Гузашт: ${skipped}`);
//         console.log('\n🎉 Тамом шуд!');
//
//         await mongoose.disconnect();
//         console.log('👋 MongoDB пайваст қатъ шуд');
//         process.exit(0);
//     } catch (err) {
//         console.error('❌ Хатогӣ:', err.message);
//         console.error(err.stack);
//         await mongoose.disconnect();
//         process.exit(1);
//     }
// };
//
// seedProductsLocal();
