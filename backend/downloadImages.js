const fs = require('fs');
const https = require('https');
const path = require('path');

const categories = {
    electronics: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
        'https://images.unsplash.com/photo-1581091870623-19f3176f7e4a?w=500',
        'https://images.unsplash.com/photo-1593642634367-d91a135587b5?w=500',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
        'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?w=500',
        'https://images.unsplash.com/photo-1580894908361-0cdbbfebf519?w=500',
        'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=500',
        'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=500',
        'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=500',
        'https://images.unsplash.com/photo-1555617117-08bbf4520e1e?w=500',
        'https://images.unsplash.com/photo-1603791440385-63d7c2a1d1f1?w=500',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500',
        'https://images.unsplash.com/photo-1533227268428-f9ed0901b4a6?w=500',
        'https://images.unsplash.com/photo-1603791440386-77c184c25e02?w=500',
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500',
        'https://images.unsplash.com/photo-1580894894510-f01b56c4a4fa?w=500',
        'https://images.unsplash.com/photo-1593642634315-48f5414c3e5e?w=500',
        'https://images.unsplash.com/photo-1505740420927-5e560c06d30f?w=500',
        'https://images.unsplash.com/photo-1578926287067-66b18f3b80f5?w=500'
    ],
    clothes: [
        'https://images.unsplash.com/photo-1520975929644-d6de0a2cfc64?w=500',
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500',
        'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500',
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500',
        'https://images.unsplash.com/photo-1533687751550-68b49b92a41c?w=500',
        'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=500',
        'https://images.unsplash.com/photo-1580633861666-1f9f7c5742d7?w=500',
        'https://images.unsplash.com/photo-1580894741772-4db0b5c8734c?w=500',
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500',
        'https://images.unsplash.com/photo-1520974722537-f1ff7c0040e7?w=500',
        'https://images.unsplash.com/photo-1531624692184-0a3c72b063b8?w=500',
        'https://images.unsplash.com/photo-1593032465172-579c97c52187?w=500',
        'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500',
        'https://images.unsplash.com/photo-1520975929644-d6de0a2cfc64?w=500',
        'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=500',
        'https://images.unsplash.com/photo-1580633861666-1f9f7c5742d7?w=500',
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500',
        'https://images.unsplash.com/photo-1520974722537-f1ff7c0040e7?w=500',
        'https://images.unsplash.com/photo-1593032465172-579c97c52187?w=500',
        'https://images.unsplash.com/photo-1531624692184-0a3c72b063b8?w=500'
    ],
    books: [
        'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=500',
        'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=500',
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500',
        'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=500',
        'https://images.unsplash.com/photo-1476958526483-36efcaa80a2b?w=500',
        'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500',
        'https://images.unsplash.com/photo-1496104679561-38d1f7d0cb9f?w=500',
        'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500',
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500',
        'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=500',
        'https://images.unsplash.com/photo-1476958526483-36efcaa80a2b?w=500',
        'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500',
        'https://images.unsplash.com/photo-1496104679561-38d1f7d0cb9f?w=500',
        'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500',
        'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=500',
        'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=500',
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500',
        'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=500',
        'https://images.unsplash.com/photo-1476958526483-36efcaa80a2b?w=500',
        'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500'
    ],
    vegetables: [
        'https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=500',
        'https://images.unsplash.com/photo-1572448862527-abb347ca4c9f?w=500',
        'https://images.unsplash.com/photo-1524594157360-7a7760f9e92c?w=500',
        'https://images.unsplash.com/photo-1524594157360-7a7760f9e92c?w=500',
        'https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=500',
        'https://images.unsplash.com/photo-1572448862527-abb347ca4c9f?w=500',
        'https://images.unsplash.com/photo-1524594157360-7a7760f9e92c?w=500',
        'https://images.unsplash.com/photo-1524594157360-7a7760f9e92c?w=500',
        'https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=500',
        'https://images.unsplash.com/photo-1572448862527-abb347ca4c9f?w=500',
        'https://images.unsplash.com/photo-1524594157360-7a7760f9e92c?w=500',
        'https://images.unsplash.com/photo-1524594157360-7a7760f9e92c?w=500',
        'https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=500',
        'https://images.unsplash.com/photo-1572448862527-abb347ca4c9f?w=500',
        'https://images.unsplash.com/photo-1524594157360-7a7760f9e92c?w=500',
        'https://images.unsplash.com/photo-1524594157360-7a7760f9e92c?w=500',
        'https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=500',
        'https://images.unsplash.com/photo-1572448862527-abb347ca4c9f?w=500',
        'https://images.unsplash.com/photo-1524594157360-7a7760f9e92c?w=500'
    ],
    furniture: [
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=500',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500',
        'https://images.unsplash.com/photo-1533777324565-a040eb52fac2?w=500',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500',
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=500',
        'https://images.unsplash.com/photo-1533777324565-a040eb52fac2?w=500',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500',
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=500',
        'https://images.unsplash.com/photo-1533777324565-a040eb52fac2?w=500',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500',
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=500',
        'https://images.unsplash.com/photo-1533777324565-a040eb52fac2?w=500',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500',
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=500',
        'https://images.unsplash.com/photo-1533777324565-a040eb52fac2?w=500',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500',
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=500',
        'https://images.unsplash.com/photo-1533777324565-a040eb52fac2?w=500',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500'
    ]
};

// Функция барои зеркашӣ
const download = (url, filename) => {
    const dir = path.join(__dirname, 'public/images/products');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const filePath = path.join(dir, filename);
    const file = fs.createWriteStream(filePath);

    https.get(url, (res) => {
        res.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log(`Downloaded ${filename}`);
        });
    }).on('error', (err) => {
        fs.unlink(filePath, () => {});
        console.error(`Error downloading ${filename}: ${err.message}`);
    });
};

// Зеркашӣ кардани ҳамаи категорияҳо
for (const [category, urls] of Object.entries(categories)) {
    urls.forEach((url, index) => {
        download(url, `${category}${index + 1}.jpg`);
    });
}

// const fs = require('fs');
// const https = require('https');
// const path = require('path');
//
// // URL-ҳои 20 расм барои категория Электроника
// const urls = [
//     'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
//     'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
//     'https://images.unsplash.com/photo-1581091870623-19f3176f7e4a?w=500',
//     'https://images.unsplash.com/photo-1593642634367-d91a135587b5?w=500',
//     'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
//     'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?w=500',
//     'https://images.unsplash.com/photo-1580894908361-0cdbbfebf519?w=500',
//     'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=500',
//     'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=500',
//     'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=500',
//     'https://images.unsplash.com/photo-1555617117-08bbf4520e1e?w=500',
//     'https://images.unsplash.com/photo-1603791440385-63d7c2a1d1f1?w=500',
//     'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500',
//     'https://images.unsplash.com/photo-1533227268428-f9ed0901b4a6?w=500',
//     'https://images.unsplash.com/photo-1603791440386-77c184c25e02?w=500',
//     'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500',
//     'https://images.unsplash.com/photo-1580894894510-f01b56c4a4fa?w=500',
//     'https://images.unsplash.com/photo-1593642634315-48f5414c3e5e?w=500',
//     'https://images.unsplash.com/photo-1505740420927-5e560c06d30f?w=500',
//     'https://images.unsplash.com/photo-1578926287067-66b18f3b80f5?w=500'
// ];
//
// // Функция барои зеркашӣ
// const download = (url, filename) => {
//     const filePath = path.join(__dirname, 'public/images/products', filename);
//     const file = fs.createWriteStream(filePath);
//
//     https.get(url, (response) => {
//         response.pipe(file);
//         file.on('finish', () => {
//             file.close();
//             console.log(`Downloaded ${filename}`);
//         });
//     }).on('error', (err) => {
//         fs.unlink(filePath, () => {});
//         console.error(`Error downloading ${filename}: ${err.message}`);
//     });
// };
//
// // Зеркашӣ кардани ҳама расмҳо
// urls.forEach((url, index) => {
//     const ext = '.jpg';
//     download(url, `electronics${index + 1}${ext}`);
// });
