const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Захираи маҳсулот (дар ҷои воқеӣ аз MongoDB истифода мешавад)
let products = [
  { id: 1, name: 'Телефон Samsung', price: 3500, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300', category: 'Электроника', stock: 10 },
  { id: 2, name: 'Ноутбук HP', price: 7500, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300', category: 'Электроника', stock: 5 },
  { id: 3, name: 'Соат Apple Watch', price: 4200, image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300', category: 'Электроника', stock: 8 },
  { id: 4, name: 'Навушак Sony', price: 850, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300', category: 'Электроника', stock: 15 },
  { id: 5, name: 'Китоб "Програмирование"', price: 250, image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300', category: 'Китобҳо', stock: 20 },
  { id: 6, name: 'Кафши Варзишӣ Nike', price: 1200, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300', category: 'Либос', stock: 12 }
];

let orders = [];
let nextOrderId = 1;

// API Routes

// Гирифтани ҳамаи маҳсулот
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Гирифтани як маҳсулот
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Маҳсулот ёфт нашуд' });
  res.json(product);
});

// Илова кардани маҳсулоти нав (барои админ)
app.post('/api/products', (req, res) => {
  const { name, price, image, category, stock } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({ message: 'Номи маҳсулот ва нарх зарур аст' });
  }
  
  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
    name,
    price: parseFloat(price),
    image: image || 'https://via.placeholder.com/300',
    category: category || 'Дигар',
    stock: parseInt(stock) || 0
  };
  
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Нав кардани маҳсулот
app.put('/api/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) return res.status(404).json({ message: 'Маҳсулот ёфт нашуд' });
  
  const { name, price, image, category, stock } = req.body;
  products[productIndex] = {
    ...products[productIndex],
    name: name || products[productIndex].name,
    price: price ? parseFloat(price) : products[productIndex].price,
    image: image || products[productIndex].image,
    category: category || products[productIndex].category,
    stock: stock !== undefined ? parseInt(stock) : products[productIndex].stock
  };
  
  res.json(products[productIndex]);
});

// Нест кардани маҳсулот
app.delete('/api/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) return res.status(404).json({ message: 'Маҳсулот ёфт нашуд' });
  
  products.splice(productIndex, 1);
  res.json({ message: 'Маҳсулот нест карда шуд' });
});

// Сохтани фармоиш
app.post('/api/orders', (req, res) => {
  const { customerName, customerEmail, customerPhone, items, total } = req.body;
  
  if (!customerName || !items || items.length === 0) {
    return res.status(400).json({ message: 'Маълумоти муштарӣ ва маҳсулот зарур аст' });
  }
  
  // Санҷиши захира
  for (let item of items) {
    const product = products.find(p => p.id === item.id);
    if (!product) {
      return res.status(404).json({ message: `Маҳсулот ${item.name} ёфт нашуд` });
    }
    if (product.stock < item.quantity) {
      return res.status(400).json({ message: `Захираи ${product.name} кофӣ нест` });
    }
  }
  
  // Кам кардани захира
  for (let item of items) {
    const product = products.find(p => p.id === item.id);
    product.stock -= item.quantity;
  }
  
  const newOrder = {
    id: nextOrderId++,
    customerName,
    customerEmail,
    customerPhone,
    items,
    total,
    date: new Date().toISOString(),
    status: 'Нав'
  };
  
  orders.push(newOrder);
  res.status(201).json({ message: 'Фармоиш бо муваффақият сохта шуд!', order: newOrder });
});

// Гирифтани ҳамаи фармоишҳо (барои админ)
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Сервер кор мекунад' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер дар порти ${PORT} оғоз ёфт`);
  console.log(`API дастрас аст: http://localhost:${PORT}`);
});