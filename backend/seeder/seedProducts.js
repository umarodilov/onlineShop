// backend/seeder/seedProducts.js
const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('../models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/onlineShop';

// -------------------- ID-ҳои категорияҳо --------------------
const categoryIds = {
    electronics: '696068ee038f090678009c4f',  // Электроника
    clothes: '696068ee038f090678009c50',      // Либос
    books: '696068ee038f090678009c51',        // Китобҳо
    vegetables: '6960691edfc6ffa8ba3f204e',   // Сабзавотҳо
    furniture: '69606a6bd1b6f4a4d65949ee'     // Мебел
};

// -------------------- Маҳсулотҳои намунавӣ --------------------
const products = [
    // КИТОБҲО
    {
        name: "Шоҳнома - Абулқосими Фирдавсӣ",
        price: 150,
        description: "Достони шоҳони Эрон, асари бузурги адабиёти форсӣ",
        stock: 25,
        category: categoryIds.books,
        brand: "Нашриёти Ирфон",
        rating: 4.8,
        numReviews: 45,
        isFeatured: true,
        isActive: true
    },
    {
        name: "Гулистон - Саъдии Шерозӣ",
        price: 85,
        description: "Маҷмӯаи ҳикоятҳои ахлоқӣ ва панду андарз",
        stock: 30,
        category: categoryIds.books,
        brand: "Адиб",
        rating: 4.9,
        numReviews: 52,
        isFeatured: true,
        isActive: true
    },
    {
        name: "Китоби Омӯзиши Забони Тоҷикӣ",
        price: 95,
        description: "Барои муҳоҷирон ва хориҷиён",
        stock: 40,
        category: categoryIds.books,
        brand: "Маориф",
        rating: 4.3,
        numReviews: 28,
        isFeatured: false,
        isActive: true
    },
    {
        name: "Девони Ҳофиз",
        price: 120,
        description: "Маҷмӯаи ғазалҳои Ҳофизи Шерозӣ",
        stock: 20,
        category: categoryIds.books,
        brand: "Нашриёти Ирфон",
        rating: 4.7,
        numReviews: 38,
        isFeatured: true,
        isActive: true
    },
    {
        name: "Таърихи Тоҷикон",
        price: 200,
        description: "Таърихи пурраи халқи тоҷик",
        stock: 15,
        category: categoryIds.books,
        brand: "Дониш",
        rating: 4.6,
        numReviews: 22,
        isFeatured: false,
        isActive: true
    },

    // ЭЛЕКТРОНИКА
    {
        name: "Телефон Samsung Galaxy A54",
        price: 3500,
        description: "Смартфони замонавӣ бо камераи 50MP ва экрани AMOLED",
        stock: 12,
        category: categoryIds.electronics,
        brand: "Samsung",
        rating: 4.5,
        numReviews: 89,
        isFeatured: true,
        isActive: true
    },
    {
        name: "Ноутбук Lenovo IdeaPad 3",
        price: 5500,
        description: "Intel Core i5, 8GB RAM, 512GB SSD",
        stock: 8,
        category: categoryIds.electronics,
        brand: "Lenovo",
        rating: 4.4,
        numReviews: 67,
        isFeatured: true,
        isActive: true
    },
    {
        name: "Наушники Sony WH-1000XM5",
        price: 1200,
        description: "Наушники бо шумъгирӣ",
        stock: 20,
        category: categoryIds.electronics,
        brand: "Sony",
        rating: 4.8,
        numReviews: 123,
        isFeatured: true,
        isActive: true
    },
    {
        name: "Телевизор LG 43 дюйм Smart TV",
        price: 4200,
        description: "4K Ultra HD, WebOS, WiFi",
        stock: 5,
        category: categoryIds.electronics,
        brand: "LG",
        rating: 4.6,
        numReviews: 45,
        isFeatured: false,
        isActive: true
    },
    {
        name: "Соати ҳушманд Xiaomi Mi Band 8",
        price: 450,
        description: "Мониторинги саломатӣ, варзиш",
        stock: 35,
        category: categoryIds.electronics,
        brand: "Xiaomi",
        rating: 4.3,
        numReviews: 156,
        isFeatured: false,
        isActive: true
    },

    // ЛИБОС
    {
        name: "Курта миллии тоҷикӣ (мардона)",
        price: 380,
        description: "Курта анъанавии миллӣ аз матои боифат",
        stock: 18,
        category: categoryIds.clothes,
        brand: "Чакан",
        rating: 4.7,
        numReviews: 34,
        isFeatured: true,
        isActive: true
    },
    {
        name: "Платьяи занона (Национальная одежда)",
        price: 550,
        description: "Либоси миллии занона бо нақшу нигор",
        stock: 14,
        category: categoryIds.clothes,
        brand: "Гулбахор",
        rating: 4.8,
        numReviews: 28,
        isFeatured: true,
        isActive: true
    },
    {
        name: "Футболка Nike",
        price: 180,
        description: "Футболкаи варзишӣ, 100% пахта",
        stock: 50,
        category: categoryIds.clothes,
        brand: "Nike",
        rating: 4.4,
        numReviews: 92,
        isFeatured: false,
        isActive: true
    },
    {
        name: "Шим (Джинсы) Levi's",
        price: 420,
        description: "Джинсы классикӣ",
        stock: 30,
        category: categoryIds.clothes,
        brand: "Levi's",
        rating: 4.5,
        numReviews: 67,
        isFeatured: false,
        isActive: true
    },
    {
        name: "Куртаи зимистона Columbia",
        price: 890,
        description: "Куртаи гарм барои тирамоҳ",
        stock: 12,
        category: categoryIds.clothes,
        brand: "Columbia",
        rating: 4.7,
        numReviews: 41,
        isFeatured: true,
        isActive: true
    },

    // САБЗАВОТҲО
    {
        name: "Помидор тару тоза",
        price: 12,
        description: "Помидори тару тоза, маҳаллӣ, 1кг",
        stock: 200,
        category: categoryIds.vegetables,
        brand: "Кишоварз",
        rating: 4.2,
        numReviews: 15,
        isFeatured: false,
        isActive: true
    },
    {
        name: "Картошка",
        price: 8,
        description: "Картошкаи тоза, 1кг",
        stock: 300,
        category: categoryIds.vegetables,
        brand: "Кишоварз",
        rating: 4.0,
        numReviews: 22,
        isFeatured: false,
        isActive: true
    },
    {
        name: "Пиёз",
        price: 6,
        description: "Пиёзи сурх, 1кг",
        stock: 250,
        category: categoryIds.vegetables,
        brand: "Кишоварз",
        rating: 4.1,
        numReviews: 18,
        isFeatured: false,
        isActive: true
    },
    {
        name: "Себ",
        price: 15,
        description: "Себи ширин, тару тоза, 1кг",
        stock: 150,
        category: categoryIds.vegetables,
        brand: "Боғбон",
        rating: 4.5,
        numReviews: 31,
        isFeatured: true,
        isActive: true
    },
    {
        name: "Хурмо",
        price: 45,
        description: "Хурмои ширин, 1кг",
        stock: 80,
        category: categoryIds.vegetables,
        brand: "Боғбон",
        rating: 4.6,
        numReviews: 27,
        isFeatured: true,
        isActive: true
    },

    // МЕБЕЛ
    {
        name: "Диван 3-нафара",
        price: 6500,
        description: "Диван барои толор, рангҳои гуногун",
        stock: 8,
        category: categoryIds.furniture,
        brand: "Комфорт",
        rating: 4.4,
        numReviews: 19,
        isFeatured: true,
        isActive: true
    },
    {
        name: "Мизи хӯрок",
        price: 3200,
        description: "Мизи чӯбӣ барои 6 нафар",
        stock: 12,
        category: categoryIds.furniture,
        brand: "Чӯбпоз",
        rating: 4.3,
        numReviews: 24,
        isFeatured: false,
        isActive: true
    },
    {
        name: "Кат (Кровать) 2-нафара",
        price: 4800,
        description: "Кати бо матрас, андозаи 180x200",
        stock: 6,
        category: categoryIds.furniture,
        brand: "Хоб",
        rating: 4.6,
        numReviews: 33,
        isFeatured: true,
        isActive: true
    },
    {
        name: "Шкаф барои либос",
        price: 7500,
        description: "Шкафи 3-дараи калон",
        stock: 4,
        category: categoryIds.furniture,
        brand: "Мастер",
        rating: 4.5,
        numReviews: 15,
        isFeatured: false,
        isActive: true
    },
    {
        name: "Курсӣ (Стул) барои ошхона",
        price: 450,
        description: "Комплекти 4 курсӣ",
        stock: 20,
        category: categoryIds.furniture,
        brand: "Комфорт",
        rating: 4.2,
        numReviews: 28,
        isFeatured: false,
        isActive: true
    }
];

// -------------------- Скрипт --------------------
const seedProducts = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ MongoDB пайваст шуд');

        // Хориҷ кардани маҳсулоти кӯҳна
        await Product.deleteMany({});
        console.log('🗑️  Маҳсулоти кӯҳна нест карда шуд');

        // Илова кардани маҳсулоти нав
        await Product.insertMany(products);
        console.log(`✅ ${products.length} маҳсулот илова шуд`);

        // Намоиш
        console.log('\n📊 Оморӣ:');
        console.log(`   Китобҳо: ${products.filter(p => p.category === categoryIds.books).length} маҳсулот`);
        console.log(`   Электроника: ${products.filter(p => p.category === categoryIds.electronics).length} маҳсулот`);
        console.log(`   Либос: ${products.filter(p => p.category === categoryIds.clothes).length} маҳсулот`);
        console.log(`   Сабзавотҳо: ${products.filter(p => p.category === categoryIds.vegetables).length} маҳсулот`);
        console.log(`   Мебел: ${products.filter(p => p.category === categoryIds.furniture).length} маҳсулот`);

        console.log('\n🎉 Тамом шуд!');
        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error('❌ Хатогӣ:', err.message);
        console.error(err.stack);
        await mongoose.disconnect();
        process.exit(1);
    }
};

seedProducts();
// const mongoose = require('mongoose');
// const Product = require('../models/Product');
//
// mongoose.connect('mongodb://127.0.0.1:27017/onlineShop')
//     .then(() => console.log('✅ MongoDB connected'))
//     .catch(console.error);
//
// const images = [
//     'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
//     'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500',
//     'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
// ];
//
// const random = (min, max) =>
//     Math.floor(Math.random() * (max - min + 1)) + min;
//
// const categoriesMap = {
//     "696068ee038f090678009c4f": {
//         name: "Электроника",
//         brands: ["Samsung", "Apple", "Xiaomi", "Sony"],
//         products: ["Телефон", "Ноутбук", "Гӯшмонак", "Соат", "Планшет"]
//     },
//     "696068ee038f090678009c50": {
//         name: "Либос",
//         brands: ["Nike", "Adidas", "Puma"],
//         products: ["Курта", "Футболка", "Шим", "Свитшот"]
//     },
//     "696068ee038f090678009c51": {
//         name: "Китобҳо",
//         brands: ["Penguin", "Oxford"],
//         products: ["Китоби таърих", "Китоби динӣ", "Китоби IT"]
//     },
//     "6960691edfc6ffa8ba3f204e": {
//         name: "Сабзавотҳо",
//         brands: ["Local Farm"],
//         products: ["Помидор", "Картошка", "Пиёз", "Сабзӣ"]
//     },
//     "69606a6bd1b6f4a4d65949ee": {
//         name: "Мебел",
//         brands: ["IKEA", "Comfort"],
//         products: ["Диван", "Миз", "Курсӣ", "Кат"]
//     }
// };
//
// const seedProducts = async () => {
//     await Product.deleteMany({});
//     console.log('🧹 Products cleared');
//
//     let allProducts = [];
//
//     for (const [categoryId, data] of Object.entries(categoriesMap)) {
//         const count = random(30, 40);
//
//         for (let i = 0; i < count; i++) {
//             const baseName = data.products[random(0, data.products.length - 1)];
//
//             allProducts.push({
//                 name: `${baseName} ${random(100,999)}`,
//                 description: `Маҳсулоти категорияи ${data.name}`,
//                 price: random(10, 5000),
//                 category: new mongoose.Types.ObjectId(categoryId),
//                 brand: data.brands[random(0, data.brands.length - 1)],
//                 mainImage: images[random(0, images.length - 1)],
//                 stock: random(0, 50),
//                 sold: random(0, 20),
//                 rating: Number((Math.random() * 5).toFixed(1)),
//                 numReviews: random(0, 50),
//                 tags: [data.name.toLowerCase()],
//                 isFeatured: Math.random() > 0.8,
//                 isActive: true,
//                 createdAt: new Date(),
//                 updatedAt: new Date()
//             });
//         }
//     }
//
//     await Product.insertMany(allProducts);
//     console.log(`🎉 ${allProducts.length} маҳсулот илова шуд`);
//     process.exit();
// };
//
// seedProducts();
//
