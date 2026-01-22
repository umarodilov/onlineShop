// import React, { useState, useEffect } from 'react';
// import { Grid, LayoutGrid, Filter, X, Star } from 'lucide-react';
//
// // Mock CartContext
// const useCart = () => ({
//     addToCart: async (product, quantity) => {
//         console.log('Added to cart:', product, quantity);
//         return { success: true };
//     }
// });
//
// const ProductsPage = ({ setSelectedProduct, setCurrentPage }) => {
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [loading, setLoading] = useState(false);
//
//     // filters
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [minPrice, setMinPrice] = useState('');
//     const [maxPrice, setMaxPrice] = useState('');
//     const [sortBy, setSortBy] = useState('newest');
//
//     // mobile UI
//     const [showFilters, setShowFilters] = useState(false);
//     const [gridColumns, setGridColumns] = useState(1);
//
//     useEffect(() => {
//         // Mock data
//         setProducts([
//             { _id: '1', name: 'Маҳсулоти 1', price: 150, stock: 10, rating: 4.5, numReviews: 12, category: 'cat1', mainImage: 'https://via.placeholder.com/300', createdAt: new Date() },
//             { _id: '2', name: 'Маҳсулоти 2', price: 250, stock: 5, rating: 4.0, numReviews: 8, category: 'cat2', mainImage: 'https://via.placeholder.com/300', createdAt: new Date() },
//             { _id: '3', name: 'Маҳсулоти 3', price: 350, stock: 0, rating: 4.8, numReviews: 20, category: 'cat1', mainImage: 'https://via.placeholder.com/300', createdAt: new Date() },
//             { _id: '4', name: 'Маҳсулоти 4', price: 180, stock: 15, rating: 3.5, numReviews: 5, category: 'cat3', mainImage: 'https://via.placeholder.com/300', createdAt: new Date() },
//         ]);
//         setCategories([
//             { _id: 'cat1', name: 'Электроника' },
//             { _id: 'cat2', name: 'Либос' },
//             { _id: 'cat3', name: 'Хӯрока' },
//         ]);
//     }, []);
//
//     const filteredProducts = products
//         .filter(p => !selectedCategory || p.category === selectedCategory)
//         .filter(p => !minPrice || p.price >= Number(minPrice))
//         .filter(p => !maxPrice || p.price <= Number(maxPrice))
//         .sort((a, b) => {
//             if (sortBy === 'price-low') return a.price - b.price;
//             if (sortBy === 'price-high') return b.price - a.price;
//             if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
//             return new Date(b.createdAt) - new Date(a.createdAt);
//         });
//
//     return (
//         <div className="max-w-7xl mx-auto px-4 py-6">
//             {/* Header */}
//             <div className="flex justify-between items-center mb-4">
//                 <h1 className="text-2xl font-bold">Маҳсулот</h1>
//
//                 <div className="flex gap-2">
//                     <button
//                         onClick={() => setShowFilters(true)}
//                         className="p-2 rounded-lg bg-gray-100"
//                     >
//                         <Filter className="w-5 h-5" />
//                     </button>
//
//                     <button
//                         onClick={() => setGridColumns(gridColumns === 1 ? 2 : 1)}
//                         className="p-2 rounded-lg bg-gray-100"
//                     >
//                         {gridColumns === 1 ? (
//                             <Grid className="w-5 h-5" />
//                         ) : (
//                             <LayoutGrid className="w-5 h-5" />
//                         )}
//                     </button>
//                 </div>
//             </div>
//
//             {/* Products */}
//             <div>
//                 {loading ? (
//                     <div className="text-center py-10">Боргирӣ...</div>
//                 ) : filteredProducts.length === 0 ? (
//                     <div className="text-center py-20">
//                         <p className="text-gray-500 text-lg">😔 Маҳсулот ёфт нашуд</p>
//                         <button
//                             onClick={() => {
//                                 setSelectedCategory('');
//                                 setMinPrice('');
//                                 setMaxPrice('');
//                                 setSortBy('newest');
//                             }}
//                             className="mt-4 text-purple-600 hover:underline"
//                         >
//                             Филтрҳоро тоза кунед
//                         </button>
//                     </div>
//                 ) : (
//                     <div
//                         className={`
//               grid gap-4
//               ${gridColumns === 1 ? 'grid-cols-1' : 'grid-cols-2'}
//               md:grid-cols-3 lg:grid-cols-4
//             `}
//                     >
//                         {filteredProducts.map(p => (
//                             <ProductCard
//                                 key={p._id}
//                                 product={p}
//                                 compact={gridColumns === 2}
//                                 setSelectedProduct={setSelectedProduct}
//                                 setCurrentPage={setCurrentPage}
//                             />
//                         ))}
//                     </div>
//                 )}
//             </div>
//
//             {/* Filter Modal */}
//             {showFilters && (
//                 <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
//                     <div className="bg-white w-full rounded-t-2xl p-5 max-h-[90vh] overflow-y-auto">
//                         <div className="flex justify-between mb-4">
//                             <h2 className="text-xl font-bold">Филтрҳо</h2>
//                             <button onClick={() => setShowFilters(false)}>
//                                 <X />
//                             </button>
//                         </div>
//
//                         <div className="space-y-5">
//                             {/* Категория */}
//                             <div>
//                                 <label className="block font-bold mb-2">Категория</label>
//                                 <select
//                                     value={selectedCategory}
//                                     onChange={e => setSelectedCategory(e.target.value)}
//                                     className="w-full border p-3 rounded-lg"
//                                 >
//                                     <option value="">Ҳама категорияҳо</option>
//                                     {categories.map(c => (
//                                         <option key={c._id} value={c._id}>
//                                             {c.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//
//                             {/* Нарх */}
//                             <div>
//                                 <label className="block font-bold mb-2">Нарх</label>
//                                 <div className="flex gap-3">
//                                     <input
//                                         type="number"
//                                         placeholder="Аз"
//                                         value={minPrice}
//                                         onChange={e => setMinPrice(e.target.value)}
//                                         className="w-full border p-3 rounded-lg"
//                                     />
//                                     <input
//                                         type="number"
//                                         placeholder="То"
//                                         value={maxPrice}
//                                         onChange={e => setMaxPrice(e.target.value)}
//                                         className="w-full border p-3 rounded-lg"
//                                     />
//                                 </div>
//                             </div>
//
//                             {/* Тартиб */}
//                             <div>
//                                 <label className="block font-bold mb-2">Тартиб</label>
//                                 <select
//                                     value={sortBy}
//                                     onChange={e => setSortBy(e.target.value)}
//                                     className="w-full border p-3 rounded-lg"
//                                 >
//                                     <option value="newest">Нав</option>
//                                     <option value="price-low">Нархи паст</option>
//                                     <option value="price-high">Нархи баланд</option>
//                                     <option value="rating">Баҳои баланд</option>
//                                 </select>
//                             </div>
//                         </div>
//
//                         <button
//                             onClick={() => setShowFilters(false)}
//                             className="w-full mt-4 bg-purple-600 text-white py-3 rounded-xl"
//                         >
//                             Нишон додан
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// /* Product Card */
// const ProductCard = ({ product, compact, setSelectedProduct, setCurrentPage }) => {
//     const { addToCart } = useCart();
//     const [loading, setLoading] = useState(false);
//
//     const handleAddToCart = async (e) => {
//         e.stopPropagation();
//         setLoading(true);
//         const result = await addToCart(product, 1);
//         setLoading(false);
//
//         if (result.success) {
//             alert('✅ Ба сабад илова шуд!');
//         }
//     };
//
//     return (
//         <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
//             <div
//                 onClick={() => {
//                     setSelectedProduct?.(product);
//                     setCurrentPage?.('product-detail');
//                 }}
//                 className="cursor-pointer"
//             >
//                 <img
//                     src={product.mainImage}
//                     alt={product.name}
//                     className={`w-full object-cover ${compact ? 'h-32' : 'h-48'}`}
//                     onError={(e) => {
//                         e.target.src = 'https://via.placeholder.com/300?text=Расм+нест';
//                     }}
//                 />
//             </div>
//
//             <div className={`p-${compact ? '3' : '4'}`}>
//                 <h3
//                     className={`font-bold line-clamp-2 mb-2 cursor-pointer hover:text-purple-600 ${
//                         compact ? 'text-sm' : 'text-base'
//                     }`}
//                     onClick={() => {
//                         setSelectedProduct?.(product);
//                         setCurrentPage?.('product-detail');
//                     }}
//                 >
//                     {product.name}
//                 </h3>
//
//                 {!compact && (
//                     <div className="flex items-center gap-2 mb-2">
//                         <div className="flex text-yellow-400">
//                             {[...Array(5)].map((_, i) => (
//                                 <Star
//                                     key={i}
//                                     className={`w-4 h-4 ${
//                                         i < Math.floor(product.rating || 0) ? 'fill-current' : ''
//                                     }`}
//                                 />
//                             ))}
//                         </div>
//                         <span className="text-sm text-gray-600">({product.numReviews || 0})</span>
//                     </div>
//                 )}
//
//                 <div className={`mb-2 ${compact ? 'text-xs' : 'text-sm'}`}>
//                     {product.stock > 0 ? (
//                         <p className="text-green-600">
//                             {compact ? `${product.stock}` : `Дар анбор: ${product.stock} дона`}
//                         </p>
//                     ) : (
//                         <p className="text-red-600 font-semibold">Тамом шуд</p>
//                     )}
//                 </div>
//
//                 <p className={`text-purple-600 font-bold mb-3 ${compact ? 'text-lg' : 'text-2xl'}`}>
//                     {product.price} с.
//                 </p>
//
//                 <button
//                     onClick={handleAddToCart}
//                     disabled={loading || product.stock === 0}
//                     className={`
//             w-full rounded-lg bg-purple-600 text-white font-semibold
//             hover:bg-purple-700 transition
//             disabled:bg-gray-300 disabled:cursor-not-allowed
//             ${compact ? 'py-1.5 text-sm' : 'py-2'}
//             ${loading ? 'opacity-50' : ''}
//           `}
//                 >
//                     {loading ? '...' : product.stock === 0 ? 'Тамом шуд' : 'Ба сабад'}
//                 </button>
//             </div>
//         </div>
//     );
// };
//
// export default ProductsPage;


// import React, { useState, useEffect } from 'react';
// import { Grid, LayoutGrid, Filter, X, Star } from 'lucide-react';
// import { useCart } from '../context/CartContext';
//
// const ProductsPage = ({ setSelectedProduct, setCurrentPage }) => {
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [loading, setLoading] = useState(true);
//
//     // filters
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [minPrice, setMinPrice] = useState('');
//     const [maxPrice, setMaxPrice] = useState('');
//     const [sortBy, setSortBy] = useState('newest');
//
//     // mobile UI
//     const [showFilters, setShowFilters] = useState(false);
//     const [gridColumns, setGridColumns] = useState(1); // 1 or 2 (mobile)
//
//     useEffect(() => {
//         fetchData();
//     }, []);
//
//     const fetchData = async () => {
//         setLoading(true);
//         try {
//             const [pRes, cRes] = await Promise.all([
//                 fetch('http://localhost:5000/api/products'),
//                 fetch('http://localhost:5000/api/categories')
//             ]);
//             const pData = await pRes.json();
//             const cData = await cRes.json();
//
//             if (pData.success) setProducts(pData.products);
//             if (cData.success) setCategories(cData.categories);
//         } catch (e) {
//             console.error(e);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const filteredProducts = products
//         .filter(p => !selectedCategory || p.category === selectedCategory)
//         .filter(p => !minPrice || p.price >= Number(minPrice))
//         .filter(p => !maxPrice || p.price <= Number(maxPrice))
//         .sort((a, b) => {
//             if (sortBy === 'price-low') return a.price - b.price;
//             if (sortBy === 'price-high') return b.price - a.price;
//             if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
//             return new Date(b.createdAt) - new Date(a.createdAt);
//         });
//
//     return (
//         <div className="max-w-7xl mx-auto px-4 py-6">
//
//             {/* ===== Header ===== */}
//             <div className="flex justify-between items-center mb-4">
//                 <h1 className="text-2xl font-bold">Маҳсулот</h1>
//
//                 {/* Desktop & Mobile controls */}
//                 <div className="flex gap-2">
//                     {/* Filter button (ҳам барои mobile, ҳам барои desktop) */}
//                     <button
//                         onClick={() => setShowFilters(true)}
//                         className="p-2 rounded-lg bg-purple-100 hover:bg-purple-200 transition flex items-center gap-2"
//                     >
//                         <Filter className="w-5 h-5 text-purple-600" />
//                         <span className="hidden sm:inline text-sm font-medium text-purple-600">
//                             Филтр
//                         </span>
//                     </button>
//
//                     {/* Grid toggle (фақат mobile) */}
//                     <button
//                         onClick={() => setGridColumns(gridColumns === 1 ? 2 : 1)}
//                         className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
//                     >
//                         {gridColumns === 1 ? (
//                             <Grid className="w-5 h-5" />
//                         ) : (
//                             <LayoutGrid className="w-5 h-5" />
//                         )}
//                     </button>
//                 </div>
//             </div>
//
//             {/* ===== Products Grid (пурра width) ===== */}
//             <div>
//                 {loading ? (
//                     <div className="text-center py-10">Боргирӣ...</div>
//                 ) : filteredProducts.length === 0 ? (
//                     <div className="text-center py-20">
//                         <p className="text-gray-500 text-lg">😔 Маҳсулот ёфт нашуд</p>
//                         <button
//                             onClick={() => {
//                                 setSelectedCategory('');
//                                 setMinPrice('');
//                                 setMaxPrice('');
//                                 setSortBy('newest');
//                             }}
//                             className="mt-4 text-purple-600 hover:underline"
//                         >
//                             Филтрҳоро тоза кунед
//                         </button>
//                     </div>
//                 ) : (
//                     <div
//                         className={`
//                             grid gap-4
//                             ${gridColumns === 1 ? 'grid-cols-1' : 'grid-cols-2'}
//                             md:grid-cols-3 lg:grid-cols-4
//                         `}
//                     >
//                         {filteredProducts.map(p => (
//                             <ProductCard
//                                 key={p._id}
//                                 product={p}
//                                 compact={gridColumns === 2}
//                                 setSelectedProduct={setSelectedProduct}
//                                 setCurrentPage={setCurrentPage}
//                             />
//                         ))}
//                     </div>
//                 )}
//             </div>
//
//             {/* ===== Filter Modal (барои ҳамаи экранҳо) ===== */}
//             {showFilters && (
//                 <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//                     <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
//                         {/* Header */}
//                         <div className="flex justify-between items-center p-5 border-b bg-gradient-to-r from-purple-600 to-blue-600">
//                             <h2 className="text-xl font-bold text-white">Филтрҳо ва Тартиб</h2>
//                             <button
//                                 onClick={() => setShowFilters(false)}
//                                 className="text-white hover:bg-white/20 rounded-full p-2 transition"
//                             >
//                                 <X className="w-5 h-5" />
//                             </button>
//                         </div>
//
//                         {/* Content */}
//                         <div className="p-5 max-h-[70vh] overflow-y-auto">
//                             <FilterContent
//                                 {...{
//                                     categories,
//                                     selectedCategory,
//                                     setSelectedCategory,
//                                     minPrice,
//                                     setMinPrice,
//                                     maxPrice,
//                                     setMaxPrice,
//                                     sortBy,
//                                     setSortBy
//                                 }}
//                             />
//                         </div>
//
//                         {/* Footer */}
//                         <div className="p-5 border-t bg-gray-50 flex gap-3">
//                             <button
//                                 onClick={() => {
//                                     setSelectedCategory('');
//                                     setMinPrice('');
//                                     setMaxPrice('');
//                                     setSortBy('newest');
//                                 }}
//                                 className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
//                             >
//                                 Тоза кардан
//                             </button>
//                             <button
//                                 onClick={() => setShowFilters(false)}
//                                 className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
//                             >
//                                 Нишон додан ({filteredProducts.length})
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// /* ================= FILTER CONTENT ================= */
// const FilterContent = ({
//                            categories,
//                            selectedCategory,
//                            setSelectedCategory,
//                            minPrice,
//                            setMinPrice,
//                            maxPrice,
//                            setMaxPrice,
//                            sortBy,
//                            setSortBy
//                        }) => (
//     <div className="space-y-6">
//         {/* Категория */}
//         <div>
//             <label className="block font-bold mb-3 text-gray-700">Категория</label>
//             <div className="space-y-2">
//                 <button
//                     onClick={() => setSelectedCategory('')}
//                     className={`w-full text-left px-4 py-3 rounded-lg border-2 transition ${
//                         selectedCategory === ''
//                             ? 'border-purple-600 bg-purple-50 text-purple-600 font-semibold'
//                             : 'border-gray-200 hover:border-purple-300'
//                     }`}
//                 >
//                     Ҳамаи категорияҳо
//                 </button>
//                 {categories.map(c => (
//                     <button
//                         key={c._id}
//                         onClick={() => setSelectedCategory(c._id)}
//                         className={`w-full text-left px-4 py-3 rounded-lg border-2 transition ${
//                             selectedCategory === c._id
//                                 ? 'border-purple-600 bg-purple-50 text-purple-600 font-semibold'
//                                 : 'border-gray-200 hover:border-purple-300'
//                         }`}
//                     >
//                         {c.name}
//                     </button>
//                 ))}
//             </div>
//         </div>
//
//         {/* Нарх */}
//         <div>
//             <label className="block font-bold mb-3 text-gray-700">Нарх (сомонӣ)</label>
//             <div className="flex gap-3">
//                 <input
//                     type="number"
//                     placeholder="Аз"
//                     value={minPrice}
//                     onChange={e => setMinPrice(e.target.value)}
//                     className="flex-1 border-2 border-gray-200 p-3 rounded-lg focus:border-purple-600 outline-none"
//                 />
//                 <input
//                     type="number"
//                     placeholder="То"
//                     value={maxPrice}
//                     onChange={e => setMaxPrice(e.target.value)}
//                     className="flex-1 border-2 border-gray-200 p-3 rounded-lg focus:border-purple-600 outline-none"
//                 />
//             </div>
//         </div>
//
//         {/* Тартиб */}
//         <div>
//             <label className="block font-bold mb-3 text-gray-700">Тартиб додан</label>
//             <select
//                 value={sortBy}
//                 onChange={e => setSortBy(e.target.value)}
//                 className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-purple-600 outline-none"
//             >
//                 <option value="newest">Навтарин</option>
//                 <option value="price-low">Нархи паст → Баланд</option>
//                 <option value="price-high">Нархи баланд → Паст</option>
//                 <option value="rating">Баҳои баланд</option>
//             </select>
//         </div>
//     </div>
// );
//
// /* ================= PRODUCT CARD ================= */
// const ProductCard = ({ product, compact, setSelectedProduct, setCurrentPage }) => {
//     const { addToCart } = useCart();
//     const [loading, setLoading] = useState(false);
//
//     const handleAddToCart = async (e) => {
//         e.stopPropagation();
//         setLoading(true);
//         const result = await addToCart(product, 1);
//         setLoading(false);
//
//         if (result.success) {
//             alert('✅ Ба cart илова шуд!');
//         }
//     };
//
//     return (
//         <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
//             <div
//                 onClick={() => {
//                     setSelectedProduct(product);
//                     setCurrentPage('product-detail');
//                 }}
//                 className="cursor-pointer"
//             >
//                 <img
//                     src={`http://localhost:5000${product.mainImage}`}
//                     alt={product.name}
//                     className={`w-full object-cover ${compact ? 'h-32' : 'h-48'}`}
//                     onError={(e) => {
//                         e.target.src = 'https://via.placeholder.com/300?text=Расм+нест';
//                     }}
//                 />
//             </div>
//
//             <div className={`p-${compact ? '3' : '4'}`}>
//                 <h3
//                     className={`font-bold line-clamp-2 mb-2 cursor-pointer hover:text-purple-600 ${
//                         compact ? 'text-sm' : 'text-base'
//                     }`}
//                     onClick={() => {
//                         setSelectedProduct(product);
//                         setCurrentPage('product-detail');
//                     }}
//                 >
//                     {product.name}
//                 </h3>
//
//                 {!compact && (
//                     <div className="flex items-center gap-2 mb-2">
//                         <div className="flex text-yellow-400">
//                             {[...Array(5)].map((_, i) => (
//                                 <Star
//                                     key={i}
//                                     className={`w-4 h-4 ${
//                                         i < Math.floor(product.rating || 0) ? 'fill-current' : ''
//                                     }`}
//                                 />
//                             ))}
//                         </div>
//                         <span className="text-sm text-gray-600">({product.numReviews || 0})</span>
//                     </div>
//                 )}
//
//                 <div className={`mb-2 ${compact ? 'text-xs' : 'text-sm'}`}>
//                     {product.stock > 0 ? (
//                         <p className="text-green-600">
//                             {compact ? `${product.stock}` : `Дар анбор: ${product.stock} дона`}
//                         </p>
//                     ) : (
//                         <p className="text-red-600 font-semibold">Тамом шуд</p>
//                     )}
//                 </div>
//
//                 <p className={`text-purple-600 font-bold mb-3 ${compact ? 'text-lg' : 'text-2xl'}`}>
//                     {product.price} с.
//                 </p>
//
//                 <button
//                     onClick={handleAddToCart}
//                     disabled={loading || product.stock === 0}
//                     className={`
//                         w-full rounded-lg bg-purple-600 text-white font-semibold
//                         hover:bg-purple-700 transition
//                         disabled:bg-gray-300 disabled:cursor-not-allowed
//                         ${compact ? 'py-1.5 text-sm' : 'py-2'}
//                         ${loading ? 'opacity-50' : ''}
//                     `}
//                 >
//                     {loading ? '...' : product.stock === 0 ? 'Тамом шуд' : 'Ба сабад'}
//                 </button>
//             </div>
//         </div>
//     );
// };
//
// export default ProductsPage;
// // // src/pages/ProductsPage.js
// import React, { useState, useEffect } from 'react';
// import { Grid, LayoutGrid, Filter, X, Star } from 'lucide-react';
// import { useCart } from '../context/CartContext';
//
// const ProductsPage = ({ setSelectedProduct, setCurrentPage }) => {
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [loading, setLoading] = useState(true);
//
//     // filters
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [minPrice, setMinPrice] = useState('');
//     const [maxPrice, setMaxPrice] = useState('');
//     const [sortBy, setSortBy] = useState('newest');
//
//     // mobile UI
//     const [showFilters, setShowFilters] = useState(false);
//     const [gridColumns, setGridColumns] = useState(1); // 1 or 2 (mobile)
//
//     useEffect(() => {
//         fetchData();
//     }, []);
//
//     const fetchData = async () => {
//         setLoading(true);
//         try {
//             const [pRes, cRes] = await Promise.all([
//                 fetch('http://localhost:5000/api/products'),
//                 fetch('http://localhost:5000/api/categories')
//             ]);
//             const pData = await pRes.json();
//             const cData = await cRes.json();
//
//             if (pData.success) setProducts(pData.products);
//             if (cData.success) setCategories(cData.categories);
//         } catch (e) {
//             console.error(e);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const filteredProducts = products
//         .filter(p => !selectedCategory || p.category === selectedCategory)
//         .filter(p => !minPrice || p.price >= Number(minPrice))
//         .filter(p => !maxPrice || p.price <= Number(maxPrice))
//         .sort((a, b) => {
//             if (sortBy === 'price-low') return a.price - b.price;
//             if (sortBy === 'price-high') return b.price - a.price;
//             if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
//             return new Date(b.createdAt) - new Date(a.createdAt);
//         });
//
//     return (
//         <div className="max-w-7xl mx-auto px-4 py-6">
//
//             {/* ===== Header ===== */}
//             <div className="flex justify-between items-center mb-4">
//                 <h1 className="text-2xl font-bold">Маҳсулот</h1>
//
//                 {/* Mobile controls */}
//                 <div className="md:hidden flex gap-2">
//                     <button
//                         onClick={() => setShowFilters(true)}
//                         className="p-2 rounded-lg bg-gray-100"
//                     >
//                         <Filter className="w-5 h-5" />
//                     </button>
//
//                     <button
//                         onClick={() => setGridColumns(gridColumns === 1 ? 2 : 1)}
//                         className="p-2 rounded-lg bg-gray-100"
//                     >
//                         {gridColumns === 1 ? (
//                             <Grid className="w-5 h-5" />
//                         ) : (
//                             <LayoutGrid className="w-5 h-5" />
//                         )}
//                     </button>
//                 </div>
//             </div>
//
//             {/* ===== Desktop layout ===== */}
//             <div className="grid md:grid-cols-4 gap-6">
//
//                 {/* Filters desktop */}
//                 <aside className="hidden md:block bg-white p-5 rounded-xl shadow">
//                     <FilterContent
//                         {...{
//                             categories,
//                             selectedCategory,
//                             setSelectedCategory,
//                             minPrice,
//                             setMinPrice,
//                             maxPrice,
//                             setMaxPrice,
//                             sortBy,
//                             setSortBy
//                         }}
//                     />
//                 </aside>
//
//                 {/* Products */}
//                 <div className="md:col-span-3">
//                     {loading ? (
//                         <div className="text-center py-10">Боргирӣ...</div>
//                     ) : (
//                         <div
//                             className={`
//                 grid gap-4
//                 ${gridColumns === 1 ? 'grid-cols-1' : 'grid-cols-2'}
//                 md:grid-cols-3 lg:grid-cols-4
//               `}
//                         >
//                             {filteredProducts.map(p => (
//                                 <ProductCard
//                                     key={p._id}
//                                     product={p}
//                                     compact={gridColumns === 2}
//                                     setSelectedProduct={setSelectedProduct}
//                                     setCurrentPage={setCurrentPage}
//                                 />
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>
//
//             {/* ===== Mobile Filter Modal ===== */}
//             {showFilters && (
//                 <div className="fixed inset-0 bg-black/40 z-50 flex items-end md:hidden">
//                     <div className="bg-white w-full rounded-t-2xl p-5 max-h-[90vh] overflow-y-auto">
//                         <div className="flex justify-between mb-4">
//                             <h2 className="text-xl font-bold">Филтрҳо</h2>
//                             <button onClick={() => setShowFilters(false)}>
//                                 <X />
//                             </button>
//                         </div>
//
//                         <FilterContent
//                             {...{
//                                 categories,
//                                 selectedCategory,
//                                 setSelectedCategory,
//                                 minPrice,
//                                 setMinPrice,
//                                 maxPrice,
//                                 setMaxPrice,
//                                 sortBy,
//                                 setSortBy
//                             }}
//                         />
//
//                         <button
//                             onClick={() => setShowFilters(false)}
//                             className="w-full mt-4 bg-purple-600 text-white py-3 rounded-xl"
//                         >
//                             Нишон додан
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// /* ================= FILTER CONTENT ================= */
// const FilterContent = ({
//                            categories,
//                            selectedCategory,
//                            setSelectedCategory,
//                            minPrice,
//                            setMinPrice,
//                            maxPrice,
//                            setMaxPrice,
//                            sortBy,
//                            setSortBy
//                        }) => (
//     <div className="space-y-5">
//         <div className="md:hidden mb-4">
//             <select
//                 value={selectedCategory}
//                 onChange={e => setSelectedCategory(e.target.value)}
//                 className="w-full border p-3 rounded-lg"
//             >
//                 <option value="">Ҳама категорияҳо</option>
//                 {categories.map(c => (
//                     <option key={c._id} value={c._id}>
//                         {c.name}
//                     </option>
//                 ))}
//             </select>
//
//
//         </div>
//         <div className="flex gap-3">
//             <input
//                 type="number"
//                 placeholder="Аз"
//                 value={minPrice}
//                 onChange={e => setMinPrice(e.target.value)}
//                 className="w-full border p-3 rounded-lg"
//             />
//             <input
//                 type="number"
//                 placeholder="То"
//                 value={maxPrice}
//                 onChange={e => setMaxPrice(e.target.value)}
//                 className="w-full border p-3 rounded-lg"
//             />
//         </div>
//
//         <select
//             value={sortBy}
//             onChange={e => setSortBy(e.target.value)}
//             className="w-full border p-3 rounded-lg"
//         >
//             <option value="newest">Нав</option>
//             <option value="price-low">Нархи паст</option>
//             <option value="price-high">Нархи баланд</option>
//             <option value="rating">Баҳои баланд</option>
//         </select>
//     </div>
// );
//
// /* ================= PRODUCT CARD ================= */
// const ProductCard = ({ product, compact, setSelectedProduct, setCurrentPage }) => {
//     const { addToCart } = useCart();
//
//     return (
//         <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
//             <div
//                 onClick={() => {
//                     setSelectedProduct(product);
//                     setCurrentPage('product-detail');
//                 }}
//                 className="cursor-pointer"
//             >
//                 <img
//                     src={product.mainImage}
//                     alt={product.name}
//                     className={`w-full object-cover ${compact ? 'h-32' : 'h-48'}`}
//                 />
//             </div>
//
//             <div className={`p-${compact ? '3' : '4'}`}>
//                 <h3 className={`font-bold line-clamp-2 ${compact ? 'text-sm' : 'text-base'}`}>
//                     {product.name}
//                 </h3>
//
//                 <p className={`text-purple-600 font-bold ${compact ? 'text-lg' : 'text-2xl'}`}>
//                     {product.price} с.
//                 </p>
//
//                 <button
//                     onClick={() => addToCart(product, 1)}
//                     className={`w-full mt-2 rounded-lg bg-purple-600 text-white ${compact ? 'py-1.5 text-sm' : 'py-2'}`}
//                 >
//                     Ба сабад
//                 </button>
//             </div>
//         </div>
//     );
// };
//
// export default ProductsPage;

// // src/pages/ProductsPage.js
// import React, { useState, useEffect } from 'react';
// import { Grid, LayoutGrid } from 'lucide-react'; // Icons барои toggle
// import { useCart } from '../context/CartContext';
// import { Star } from 'lucide-react';
//
// const ProductsPage = ({ setSelectedProduct, setCurrentPage }) => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedCategory, setSelectedCategory] = useState('all');
//     const [categories, setCategories] = useState([]);
//
//     // State барои grid layout (1 колонка ё 2 колонка)
//     const [gridColumns, setGridColumns] = useState(1); // Default: 1 колонка
//
//     useEffect(() => {
//         fetchProducts();
//         fetchCategories();
//     }, [selectedCategory]);
//
//     const fetchProducts = async () => {
//         setLoading(true);
//         try {
//             const url = selectedCategory === 'all'
//                 ? 'http://localhost:5000/api/products'
//                 : `http://localhost:5000/api/products?category=${selectedCategory}`;
//
//             const res = await fetch(url);
//             const data = await res.json();
//
//             if (data.success) {
//                 setProducts(data.products);
//             }
//         } catch (err) {
//             console.error('Хатогӣ:', err);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const fetchCategories = async () => {
//         try {
//             const res = await fetch('http://localhost:5000/api/categories');
//             const data = await res.json();
//             if (data.success) {
//                 setCategories(data.categories);
//             }
//         } catch (err) {
//             console.error('Хатогӣ дар гирифтани категорияҳо:', err);
//         }
//     };
//
//     return (
//         <div className="max-w-7xl mx-auto px-4 py-8">
//             <div className="flex items-center justify-between mb-6">
//                 <h1 className="text-3xl font-bold">Маҳсулот</h1>
//
//                 {/* Toggle Button - Фақат дар мобилӣ */}
//                 <div className="md:hidden flex items-center gap-2">
//                     <button
//                         onClick={() => setGridColumns(1)}
//                         className={`p-2 rounded-lg transition ${
//                             gridColumns === 1
//                                 ? 'bg-purple-600 text-white'
//                                 : 'bg-gray-200 text-gray-600'
//                         }`}
//                         title="1 колонка"
//                     >
//                         <LayoutGrid className="w-5 h-5" />
//                     </button>
//                     <button
//                         onClick={() => setGridColumns(2)}
//                         className={`p-2 rounded-lg transition ${
//                             gridColumns === 2
//                                 ? 'bg-purple-600 text-white'
//                                 : 'bg-gray-200 text-gray-600'
//                         }`}
//                         title="2 колонка"
//                     >
//                         <Grid className="w-5 h-5" />
//                     </button>
//                 </div>
//             </div>
//
//             {/* Categories Filter */}
//             <div className="mb-6 overflow-x-auto">
//                 <div className="flex gap-2 pb-2">
//                     <button
//                         onClick={() => setSelectedCategory('all')}
//                         className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
//                             selectedCategory === 'all'
//                                 ? 'bg-purple-600 text-white'
//                                 : 'bg-white text-gray-700 hover:bg-gray-100'
//                         }`}
//                     >
//                         Ҳама
//                     </button>
//                     {categories.map(cat => (
//                         <button
//                             key={cat._id}
//                             onClick={() => setSelectedCategory(cat.name)}
//                             className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
//                                 selectedCategory === cat.name
//                                     ? 'bg-purple-600 text-white'
//                                     : 'bg-white text-gray-700 hover:bg-gray-100'
//                             }`}
//                         >
//                             {cat.name}
//                         </button>
//                     ))}
//                 </div>
//             </div>
//
//             {/* Products Grid */}
//             {loading ? (
//                 <div className="text-center py-12">Боргирӣ...</div>
//             ) : products.length === 0 ? (
//                 <div className="text-center py-12">
//                     <p className="text-gray-500 text-lg">Маҳсулот ёфт нашуд</p>
//                 </div>
//             ) : (
//                 <div
//                     className={`
//                         grid gap-4
//                         ${gridColumns === 1 ? 'grid-cols-1' : 'grid-cols-2'}
//                         md:grid-cols-3 lg:grid-cols-4
//                     `}
//                 >
//                     {products.map(product => (
//                         <ProductCard
//                             key={product._id}
//                             product={product}
//                             setSelectedProduct={setSelectedProduct}
//                             setCurrentPage={setCurrentPage}
//                             gridColumns={gridColumns}
//                         />
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };
//
// const ProductCard = ({ product, setSelectedProduct, setCurrentPage, gridColumns }) => {
//     const { addToCart } = useCart();
//     const [loading, setLoading] = useState(false);
//
//     const handleAddToCart = async (e) => {
//         e.stopPropagation();
//         setLoading(true);
//         const result = await addToCart(product, 1);
//         setLoading(false);
//
//         if (result.success) {
//             alert('✅ Ба cart илова шуд!');
//         }
//     };
//
//     const handleClick = () => {
//         setSelectedProduct(product);
//         setCurrentPage('product-detail');
//     };
//
//     // Дар 2-колонка режим, дизайни компакт
//     const isCompact = gridColumns === 2;
//
//     return (
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
//             <div onClick={handleClick} className="cursor-pointer">
//                 <img
//                     src={product.mainImage || 'https://via.placeholder.com/300'}
//                     alt={product.name}
//                     className={`w-full object-cover ${isCompact ? 'h-32' : 'h-48'}`}
//                 />
//             </div>
//             <div className={`p-${isCompact ? '3' : '4'}`}>
//                 <h3
//                     className={`font-bold mb-2 line-clamp-2 cursor-pointer ${
//                         isCompact ? 'text-sm' : 'text-base'
//                     }`}
//                     onClick={handleClick}
//                 >
//                     {product.name}
//                 </h3>
//
//                 {!isCompact && (
//                     <div className="flex items-center gap-2 mb-2">
//                         <div className="flex text-yellow-400">
//                             {[...Array(5)].map((_, i) => (
//                                 <Star
//                                     key={i}
//                                     className={`w-4 h-4 ${
//                                         i < Math.floor(product.rating || 0) ? 'fill-current' : ''
//                                     }`}
//                                 />
//                             ))}
//                         </div>
//                         <span className="text-sm text-gray-600">({product.numReviews || 0})</span>
//                     </div>
//                 )}
//
//                 <div className={`mb-2 ${isCompact ? 'text-xs' : 'text-sm'}`}>
//                     {product.stock > 0 ? (
//                         <p className="text-green-600">
//                             {isCompact ? `${product.stock}` : `Дар анбор: ${product.stock} дона`}
//                         </p>
//                     ) : (
//                         <p className="text-red-600 font-semibold">Тамом</p>
//                     )}
//                 </div>
//
//                 <p className={`font-bold text-purple-600 mb-${isCompact ? '2' : '3'} ${
//                     isCompact ? 'text-lg' : 'text-2xl'
//                 }`}>
//                     {product.price} с.
//                 </p>
//
//                 <button
//                     onClick={handleAddToCart}
//                     disabled={loading || product.stock === 0}
//                     className={`
//                         w-full rounded-lg transition font-semibold
//                         ${isCompact ? 'py-1.5 text-sm' : 'py-2 text-base'}
//                         ${product.stock === 0
//                         ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                         : 'bg-purple-600 text-white hover:bg-purple-700'
//                     }
//                         ${loading ? 'opacity-50' : ''}
//                     `}
//                 >
//                     {loading ? '...' : product.stock === 0 ? 'Тамом' : 'Ба сабад'}
//                 </button>
//             </div>
//         </div>
//     );
// };
//
// export default ProductsPage;
// // // frontend/src/pages/ProductsPage.js



// import React, { useState, useEffect } from 'react';
// import { Filter, X, Star } from 'lucide-react';
//
// const ProductsPage = ({ setSelectedProduct, setCurrentPage }) => {
//     const [products, setProducts] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [loading, setLoading] = useState(true);
//
//     // Filter states
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [minPrice, setMinPrice] = useState('');
//     const [maxPrice, setMaxPrice] = useState('');
//     const [sortBy, setSortBy] = useState('newest');
//     const [showFilters, setShowFilters] = useState(false);
//
//     useEffect(() => {
//         fetchData();
//     }, []);
//
//     useEffect(() => {
//         applyFilters();
//     }, [products, selectedCategory, minPrice, maxPrice, sortBy]);
//
//     const fetchData = async () => {
//         try {
//             const [productsRes, categoriesRes] = await Promise.all([
//                 fetch('/api/products'),
//                 fetch('/api/categories')
//             ]);
//
//             const productsData = await productsRes.json();
//             const categoriesData = await categoriesRes.json();
//
//             if (productsData.success) setProducts(productsData.products);
//             if (categoriesData.success) setCategories(categoriesData.categories);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const applyFilters = () => {
//         let filtered = [...products];
//
//         if (selectedCategory) {
//             filtered = filtered.filter(p => p.category?._id === selectedCategory);
//         }
//
//         if (minPrice) {
//             filtered = filtered.filter(p => p.price >= Number(minPrice));
//         }
//         if (maxPrice) {
//             filtered = filtered.filter(p => p.price <= Number(maxPrice));
//         }
//
//         switch (sortBy) {
//             case 'price-low':
//                 filtered.sort((a, b) => a.price - b.price);
//                 break;
//             case 'price-high':
//                 filtered.sort((a, b) => b.price - a.price);
//                 break;
//             case 'rating':
//                 filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
//                 break;
//             case 'newest':
//             default:
//                 filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//                 break;
//         }
//
//         setFilteredProducts(filtered);
//     };
//
//     const resetFilters = () => {
//         setSelectedCategory('');
//         setMinPrice('');
//         setMaxPrice('');
//         setSortBy('newest');
//     };
//
//     if (loading) {
//         return <div className="text-center py-20">Бор шуда истодааст...</div>;
//     }
//
//     return (
//         <div className="max-w-7xl mx-auto px-4 py-12">
//             <div className="flex justify-between items-center mb-8">
//                 <h1 className="text-4xl font-bold">Ҳамаи маҳсулот ({filteredProducts.length})</h1>
//
//                 <button
//                     onClick={() => setShowFilters(!showFilters)}
//                     className="md:hidden flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg"
//                 >
//                     <Filter className="w-5 h-5" />
//                     Филтр
//                 </button>
//             </div>
//
//             <div className="grid md:grid-cols-4 gap-6">
//                 {/* Filters Sidebar */}
//                 <div className={`md:block ${showFilters ? 'block' : 'hidden'} md:col-span-1`}>
//                     <div className="bg-white p-6 rounded-xl shadow-lg sticky top-4">
//                         <div className="flex justify-between items-center mb-4">
//                             <h2 className="text-2xl font-bold">Филтрҳо</h2>
//                             <button onClick={resetFilters} className="text-sm text-purple-600 hover:underline">
//                                 Тоза кардан
//                             </button>
//                         </div>
//
//                         {/* Category */}
//                         <div className="mb-6">
//                             <label className="block font-bold mb-3">Категория</label>
//                             <select
//                                 value={selectedCategory}
//                                 onChange={(e) => setSelectedCategory(e.target.value)}
//                                 className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 outline-none"
//                             >
//                                 <option value="">Ҳама категорияҳо</option>
//                                 {categories.map(cat => (
//                                     <option key={cat._id} value={cat._id}>{cat.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//
//                         {/* Price */}
//                         <div className="mb-6">
//                             <label className="block font-bold mb-3">Нарх (сомонӣ)</label>
//                             <div className="space-y-3">
//                                 <input
//                                     type="number"
//                                     value={minPrice}
//                                     onChange={(e) => setMinPrice(e.target.value)}
//                                     placeholder="Аз"
//                                     className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 outline-none"
//                                 />
//                                 <input
//                                     type="number"
//                                     value={maxPrice}
//                                     onChange={(e) => setMaxPrice(e.target.value)}
//                                     placeholder="То"
//                                     className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 outline-none"
//                                 />
//                             </div>
//                         </div>
//
//                         {/* Sort */}
//                         <div className="mb-6">
//                             <label className="block font-bold mb-3">Саф кардан</label>
//                             <select
//                                 value={sortBy}
//                                 onChange={(e) => setSortBy(e.target.value)}
//                                 className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 outline-none"
//                             >
//                                 <option value="newest">Нав</option>
//                                 <option value="price-low">Нархи паст</option>
//                                 <option value="price-high">Нархи баланд</option>
//                                 <option value="rating">Баҳои баланд</option>
//                             </select>
//                         </div>
//
//                         {/* Active Filters */}
//                         {(selectedCategory || minPrice || maxPrice) && (
//                             <div className="pt-4 border-t">
//                                 <p className="text-sm text-gray-600 mb-2">Филтрҳои фаъол:</p>
//                                 <div className="space-y-2">
//                                     {selectedCategory && (
//                                         <div className="flex items-center justify-between bg-purple-100 text-purple-800 px-3 py-2 rounded-lg text-sm">
//                                             <span>{categories.find(c => c._id === selectedCategory)?.name}</span>
//                                             <button onClick={() => setSelectedCategory('')}>
//                                                 <X className="w-4 h-4" />
//                                             </button>
//                                         </div>
//                                     )}
//                                     {minPrice && (
//                                         <div className="flex items-center justify-between bg-purple-100 text-purple-800 px-3 py-2 rounded-lg text-sm">
//                                             <span>Аз {minPrice} с.</span>
//                                             <button onClick={() => setMinPrice('')}>
//                                                 <X className="w-4 h-4" />
//                                             </button>
//                                         </div>
//                                     )}
//                                     {maxPrice && (
//                                         <div className="flex items-center justify-between bg-purple-100 text-purple-800 px-3 py-2 rounded-lg text-sm">
//                                             <span>То {maxPrice} с.</span>
//                                             <button onClick={() => setMaxPrice('')}>
//                                                 <X className="w-4 h-4" />
//                                             </button>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//
//                 {/* Products Grid */}
//                 <div className="md:col-span-3">
//                     {filteredProducts.length === 0 ? (
//                         <div className="text-center py-20">
//                             <p className="text-2xl mb-4">😔 Ҳеҷ маҳсулот ёфт нашуд</p>
//                             <button
//                                 onClick={resetFilters}
//                                 className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
//                             >
//                                 Филтрҳоро тоза кунед
//                             </button>
//                         </div>
//                     ) : (
//                         <div className="grid md:grid-cols-3 gap-6">
//                             {filteredProducts.map(product => (
//                                 <ProductCard
//                                     key={product._id}
//                                     product={product}
//                                     setSelectedProduct={setSelectedProduct}
//                                     setCurrentPage={setCurrentPage}
//                                 />
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// // Product Card
// const ProductCard = ({ product, setSelectedProduct, setCurrentPage }) => {
//     const handleClick = () => {
//         setSelectedProduct(product);
//         setCurrentPage('product-detail');
//     };
//
//     return (
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition cursor-pointer">
//             <div onClick={handleClick}>
//                 <img
//                     src={product.mainImage || 'https://via.placeholder.com/300'}
//                     alt={product.name}
//                     className="w-full h-48 object-cover"
//                 />
//             </div>
//             <div className="p-4">
//                 <h3 className="font-bold mb-2 line-clamp-2" onClick={handleClick}>{product.name}</h3>
//                 <div className="flex items-center gap-2 mb-2">
//                     <div className="flex text-yellow-400">
//                         {[...Array(5)].map((_, i) => (
//                             <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? 'fill-current' : ''}`} />
//                         ))}
//                     </div>
//                     <span className="text-sm text-gray-600">({product.numReviews || 0})</span>
//                 </div>
//                 <p className="text-2xl font-bold text-purple-600 mb-3">{product.price} с.</p>
//                 <button
//                     onClick={handleClick}
//                     className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
//                 >
//                     Дида бароед
//                 </button>
//             </div>
//         </div>
//     );
// };
//
// export default ProductsPage;


// import React, { useState, useEffect } from 'react';
// import { Filter, X, Star, Grid, LayoutGrid, ChevronLeft, ChevronRight } from 'lucide-react';
//
// const ProductsPage = ({ setSelectedProduct, setCurrentPage }) => {
//     const [products, setProducts] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [loading, setLoading] = useState(true);
//
//     // Filter states
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [minPrice, setMinPrice] = useState('');
//     const [maxPrice, setMaxPrice] = useState('');
//     const [sortBy, setSortBy] = useState('newest');
//     const [showFilters, setShowFilters] = useState(false);
//
//     // Grid & Pagination
//     const [gridColumns, setGridColumns] = useState(1); // 1 or 2
//     const [currentPageNum, setCurrentPageNum] = useState(1);
//     const productsPerPage = 9;
//
//     useEffect(() => {
//         fetchData();
//     }, []);
//
//     useEffect(() => {
//         applyFilters();
//         setCurrentPageNum(1); // Reset to page 1 when filters change
//     }, [products, selectedCategory, minPrice, maxPrice, sortBy]);
//
//     const fetchData = async () => {
//         try {
//             const [productsRes, categoriesRes] = await Promise.all([
//                 fetch('http://localhost:5000/api/products'),
//                 fetch('http://localhost:5000/api/categories')
//             ]);
//
//             const productsData = await productsRes.json();
//             const categoriesData = await categoriesRes.json();
//
//             if (productsData.success) setProducts(productsData.products);
//             if (categoriesData.success) setCategories(categoriesData.categories);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const applyFilters = () => {
//         let filtered = [...products];
//
//         if (selectedCategory) {
//             filtered = filtered.filter(p => p.category?._id === selectedCategory);
//         }
//
//         if (minPrice) {
//             filtered = filtered.filter(p => p.price >= Number(minPrice));
//         }
//         if (maxPrice) {
//             filtered = filtered.filter(p => p.price <= Number(maxPrice));
//         }
//
//         switch (sortBy) {
//             case 'price-low':
//                 filtered.sort((a, b) => a.price - b.price);
//                 break;
//             case 'price-high':
//                 filtered.sort((a, b) => b.price - a.price);
//                 break;
//             case 'rating':
//                 filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
//                 break;
//             case 'newest':
//             default:
//                 filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//                 break;
//         }
//
//         setFilteredProducts(filtered);
//     };
//
//     const resetFilters = () => {
//         setSelectedCategory('');
//         setMinPrice('');
//         setMaxPrice('');
//         setSortBy('newest');
//     };
//
//     // Pagination logic
//     const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
//     const startIndex = (currentPageNum - 1) * productsPerPage;
//     const endIndex = startIndex + productsPerPage;
//     const currentProducts = filteredProducts.slice(startIndex, endIndex);
//
//     if (loading) {
//         return <div className="text-center py-20">Бор шуда истодааст...</div>;
//     }
//
//     return (
//         <div className="max-w-7xl mx-auto px-4 py-12">
//             <div className="flex justify-between items-center mb-8">
//                 <h1 className="text-4xl font-bold">Ҳамаи маҳсулот ({filteredProducts.length})</h1>
//
//                 <div className="flex gap-2">
//                     <button
//                         onClick={() => setShowFilters(!showFilters)}
//                         className="md:hidden flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg"
//                     >
//                         <Filter className="w-5 h-5" />
//                         Филтр
//                     </button>
//
//                     {/* Grid toggle button - only mobile */}
//                     <button
//                         onClick={() => setGridColumns(gridColumns === 1 ? 2 : 1)}
//                         className="md:hidden p-2 rounded-lg bg-gray-100"
//                     >
//                         {gridColumns === 1 ? (
//                             <Grid className="w-5 h-5" />
//                         ) : (
//                             <LayoutGrid className="w-5 h-5" />
//                         )}
//                     </button>
//                 </div>
//             </div>
//
//             <div className="grid md:grid-cols-4 gap-6">
//                 {/* Filters Sidebar */}
//                 <div className={`md:block ${showFilters ? 'block' : 'hidden'} md:col-span-1`}>
//                     <div className="bg-white p-6 rounded-xl shadow-lg sticky top-4">
//                         <div className="flex justify-between items-center mb-4">
//                             <h2 className="text-2xl font-bold">Филтрҳо</h2>
//                             <button onClick={resetFilters} className="text-sm text-purple-600 hover:underline">
//                                 Тоза кардан
//                             </button>
//                         </div>
//
//                         {/* Category */}
//                         <div className="mb-6">
//                             <label className="block font-bold mb-3">Категория</label>
//                             <select
//                                 value={selectedCategory}
//                                 onChange={(e) => setSelectedCategory(e.target.value)}
//                                 className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 outline-none"
//                             >
//                                 <option value="">Ҳама категорияҳо</option>
//                                 {categories.map(cat => (
//                                     <option key={cat._id} value={cat._id}>{cat.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//
//                         {/* Price */}
//                         <div className="mb-6">
//                             <label className="block font-bold mb-3">Нарх (сомонӣ)</label>
//                             <div className="space-y-3">
//                                 <input
//                                     type="number"
//                                     value={minPrice}
//                                     onChange={(e) => setMinPrice(e.target.value)}
//                                     placeholder="Аз"
//                                     className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 outline-none"
//                                 />
//                                 <input
//                                     type="number"
//                                     value={maxPrice}
//                                     onChange={(e) => setMaxPrice(e.target.value)}
//                                     placeholder="То"
//                                     className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 outline-none"
//                                 />
//                             </div>
//                         </div>
//
//                         {/* Sort */}
//                         <div className="mb-6">
//                             <label className="block font-bold mb-3">Саф кардан</label>
//                             <select
//                                 value={sortBy}
//                                 onChange={(e) => setSortBy(e.target.value)}
//                                 className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 outline-none"
//                             >
//                                 <option value="newest">Нав</option>
//                                 <option value="price-low">Нархи паст</option>
//                                 <option value="price-high">Нархи баланд</option>
//                                 <option value="rating">Баҳои баланд</option>
//                             </select>
//                         </div>
//
//                         {/* Active Filters */}
//                         {(selectedCategory || minPrice || maxPrice) && (
//                             <div className="pt-4 border-t">
//                                 <p className="text-sm text-gray-600 mb-2">Филтрҳои фаъол:</p>
//                                 <div className="space-y-2">
//                                     {selectedCategory && (
//                                         <div className="flex items-center justify-between bg-purple-100 text-purple-800 px-3 py-2 rounded-lg text-sm">
//                                             <span>{categories.find(c => c._id === selectedCategory)?.name}</span>
//                                             <button onClick={() => setSelectedCategory('')}>
//                                                 <X className="w-4 h-4" />
//                                             </button>
//                                         </div>
//                                     )}
//                                     {minPrice && (
//                                         <div className="flex items-center justify-between bg-purple-100 text-purple-800 px-3 py-2 rounded-lg text-sm">
//                                             <span>Аз {minPrice} с.</span>
//                                             <button onClick={() => setMinPrice('')}>
//                                                 <X className="w-4 h-4" />
//                                             </button>
//                                         </div>
//                                     )}
//                                     {maxPrice && (
//                                         <div className="flex items-center justify-between bg-purple-100 text-purple-800 px-3 py-2 rounded-lg text-sm">
//                                             <span>То {maxPrice} с.</span>
//                                             <button onClick={() => setMaxPrice('')}>
//                                                 <X className="w-4 h-4" />
//                                             </button>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//
//                 {/* Products Grid */}
//                 <div className="md:col-span-3">
//                     {filteredProducts.length === 0 ? (
//                         <div className="text-center py-20">
//                             <p className="text-2xl mb-4">😔 Ҳеҷ маҳсулот ёфт нашуд</p>
//                             <button
//                                 onClick={resetFilters}
//                                 className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
//                             >
//                                 Филтрҳоро тоза кунед
//                             </button>
//                         </div>
//                     ) : (
//                         <>
//                             <div className={`grid gap-6 ${gridColumns === 1 ? 'grid-cols-1' : 'grid-cols-2'} md:grid-cols-3`}>
//                                 {currentProducts.map(product => (
//                                     <ProductCard
//                                         key={product._id}
//                                         product={product}
//                                         setSelectedProduct={setSelectedProduct}
//                                         setCurrentPage={setCurrentPage}
//                                         compact={gridColumns === 2}
//                                     />
//                                 ))}
//                             </div>
//
//                             {/* Pagination */}
//                             {totalPages > 1 && (
//                                 <div className="flex justify-center items-center gap-2 mt-8">
//                                     <button
//                                         onClick={() => setCurrentPageNum(prev => Math.max(1, prev - 1))}
//                                         disabled={currentPageNum === 1}
//                                         className="p-2 rounded-lg border-2 border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//                                     >
//                                         <ChevronLeft className="w-5 h-5" />
//                                     </button>
//
//                                     {[...Array(totalPages)].map((_, i) => (
//                                         <button
//                                             key={i}
//                                             onClick={() => setCurrentPageNum(i + 1)}
//                                             className={`px-4 py-2 rounded-lg font-semibold ${
//                                                 currentPageNum === i + 1
//                                                     ? 'bg-purple-600 text-white'
//                                                     : 'border-2 border-gray-300 hover:bg-gray-100'
//                                             }`}
//                                         >
//                                             {i + 1}
//                                         </button>
//                                     ))}
//
//                                     <button
//                                         onClick={() => setCurrentPageNum(prev => Math.min(totalPages, prev + 1))}
//                                         disabled={currentPageNum === totalPages}
//                                         className="p-2 rounded-lg border-2 border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//                                     >
//                                         <ChevronRight className="w-5 h-5" />
//                                     </button>
//                                 </div>
//                             )}
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// // Product Card
// const ProductCard = ({ product, setSelectedProduct, setCurrentPage, compact }) => {
//     const handleClick = () => {
//         setSelectedProduct(product);
//         setCurrentPage('product-detail');
//     };
//
//     return (
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition cursor-pointer">
//             <div onClick={handleClick}>
//                 <img
//                     src={`http://localhost:5000${product.mainImage}` || 'https://via.placeholder.com/300'}
//                     alt={product.name}
//                     className={`w-full object-cover ${compact ? 'h-32' : 'h-48'}`}
//                     onError={(e) => {
//                         e.target.src = 'https://via.placeholder.com/300?text=Расм+нест';
//                     }}
//                 />
//             </div>
//             <div className={`p-${compact ? '3' : '4'}`}>
//                 <h3
//                     className={`font-bold mb-2 line-clamp-2 ${compact ? 'text-sm' : 'text-base'}`}
//                     onClick={handleClick}
//                 >
//                     {product.name}
//                 </h3>
//
//                 {!compact && (
//                     <div className="flex items-center gap-2 mb-2">
//                         <div className="flex text-yellow-400">
//                             {[...Array(5)].map((_, i) => (
//                                 <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? 'fill-current' : ''}`} />
//                             ))}
//                         </div>
//                         <span className="text-sm text-gray-600">({product.numReviews || 0})</span>
//                     </div>
//                 )}
//
//                 <p className={`font-bold text-purple-600 mb-3 ${compact ? 'text-lg' : 'text-2xl'}`}>
//                     {product.price} с.
//                 </p>
//
//                 <button
//                     onClick={handleClick}
//                     className={`w-full bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition ${compact ? 'py-1.5 text-sm' : 'py-2'}`}
//                 >
//                     Дида бароед
//                 </button>
//             </div>
//         </div>
//     );
// };
//
// export default ProductsPage;

import React, { useState, useEffect } from 'react';
import { Filter, X, Star, Grid, LayoutGrid, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductsPage = ({ setSelectedProduct, setCurrentPage }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter states
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [showFilters, setShowFilters] = useState(false);

    // Grid & Pagination
    const [gridColumns, setGridColumns] = useState(1); // 1 or 2
    const [currentPageNum, setCurrentPageNum] = useState(1);
    const productsPerPage = 9;

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        applyFilters();
        setCurrentPageNum(1); // Reset to page 1 when filters change
    }, [products, selectedCategory, minPrice, maxPrice, sortBy]);

    const fetchData = async () => {
        try {
            const [productsRes, categoriesRes] = await Promise.all([
                fetch('http://localhost:5000/api/products'),
                fetch('http://localhost:5000/api/categories')
            ]);

            const productsData = await productsRes.json();
            const categoriesData = await categoriesRes.json();

            if (productsData.success) setProducts(productsData.products);
            if (categoriesData.success) setCategories(categoriesData.categories);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...products];

        if (selectedCategory) {
            filtered = filtered.filter(p => {
                // Агар category объект бошад
                if (p.category?._id) {
                    return p.category._id === selectedCategory;
                }
                // Агар category string (ID) бошад
                return p.category === selectedCategory;
            });
        }

        if (minPrice) {
            filtered = filtered.filter(p => p.price >= Number(minPrice));
        }
        if (maxPrice) {
            filtered = filtered.filter(p => p.price <= Number(maxPrice));
        }

        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case 'newest':
            default:
                filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
        }

        setFilteredProducts(filtered);
    };

    const resetFilters = () => {
        setSelectedCategory('');
        setMinPrice('');
        setMaxPrice('');
        setSortBy('newest');
    };

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPageNum - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    if (loading) {
        return <div className="text-center py-20">Бор шуда истодааст...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">Ҳамаи маҳсулот ({filteredProducts.length})</h1>

                <div className="flex gap-2">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="md:hidden flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg"
                    >
                        <Filter className="w-5 h-5" />
                        Филтр
                    </button>

                    {/* Grid toggle button - only mobile */}
                    <button
                        onClick={() => setGridColumns(gridColumns === 1 ? 2 : 1)}
                        className="md:hidden p-2 rounded-lg bg-gray-100"
                    >
                        {gridColumns === 1 ? (
                            <Grid className="w-5 h-5" />
                        ) : (
                            <LayoutGrid className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
                {/* Filters Sidebar */}
                <div className={`md:block ${showFilters ? 'block' : 'hidden'} md:col-span-1`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg sticky top-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Филтрҳо</h2>
                            <button onClick={resetFilters} className="text-sm text-purple-600 hover:underline">
                                Тоза кардан
                            </button>
                        </div>

                        {/* Category */}
                        <div className="mb-6">
                            <label className="block font-bold mb-3">Категория</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 outline-none"
                            >
                                <option value="">Ҳама категорияҳо</option>
                                {categories.map(cat => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <label className="block font-bold mb-3">Нарх (сомонӣ)</label>
                            <div className="space-y-3">
                                <input
                                    type="number"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    placeholder="Аз"
                                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 outline-none"
                                />
                                <input
                                    type="number"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    placeholder="То"
                                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 outline-none"
                                />
                            </div>
                        </div>

                        {/* Sort */}
                        <div className="mb-6">
                            <label className="block font-bold mb-3">Саф кардан</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 outline-none"
                            >
                                <option value="newest">Нав</option>
                                <option value="price-low">Нархи паст</option>
                                <option value="price-high">Нархи баланд</option>
                                <option value="rating">Баҳои баланд</option>
                            </select>
                        </div>

                        {/* Active Filters */}
                        {(selectedCategory || minPrice || maxPrice) && (
                            <div className="pt-4 border-t">
                                <p className="text-sm text-gray-600 mb-2">Филтрҳои фаъол:</p>
                                <div className="space-y-2">
                                    {selectedCategory && (
                                        <div className="flex items-center justify-between bg-purple-100 text-purple-800 px-3 py-2 rounded-lg text-sm">
                                            <span>{categories.find(c => c._id === selectedCategory)?.name}</span>
                                            <button onClick={() => setSelectedCategory('')}>
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                    {minPrice && (
                                        <div className="flex items-center justify-between bg-purple-100 text-purple-800 px-3 py-2 rounded-lg text-sm">
                                            <span>Аз {minPrice} с.</span>
                                            <button onClick={() => setMinPrice('')}>
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                    {maxPrice && (
                                        <div className="flex items-center justify-between bg-purple-100 text-purple-800 px-3 py-2 rounded-lg text-sm">
                                            <span>То {maxPrice} с.</span>
                                            <button onClick={() => setMaxPrice('')}>
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Products Grid */}
                <div className="md:col-span-3">
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-2xl mb-4">😔 Ҳеҷ маҳсулот ёфт нашуд</p>
                            <button
                                onClick={resetFilters}
                                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
                            >
                                Филтрҳоро тоза кунед
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className={`grid gap-6 ${gridColumns === 1 ? 'grid-cols-1' : 'grid-cols-2'} md:grid-cols-3`}>
                                {currentProducts.map(product => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        setSelectedProduct={setSelectedProduct}
                                        setCurrentPage={setCurrentPage}
                                        compact={gridColumns === 2}
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-8">
                                    <button
                                        onClick={() => setCurrentPageNum(prev => Math.max(1, prev - 1))}
                                        disabled={currentPageNum === 1}
                                        className="p-2 rounded-lg border-2 border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>

                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPageNum(i + 1)}
                                            className={`px-4 py-2 rounded-lg font-semibold ${
                                                currentPageNum === i + 1
                                                    ? 'bg-purple-600 text-white'
                                                    : 'border-2 border-gray-300 hover:bg-gray-100'
                                            }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => setCurrentPageNum(prev => Math.min(totalPages, prev + 1))}
                                        disabled={currentPageNum === totalPages}
                                        className="p-2 rounded-lg border-2 border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

// Product Card
const ProductCard = ({ product, setSelectedProduct, setCurrentPage, compact }) => {
    const handleClick = () => {
        setSelectedProduct(product);
        setCurrentPage('product-detail');
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition cursor-pointer">
            <div onClick={handleClick}>
                <img
                    src={`http://localhost:5000${product.mainImage}` || 'https://via.placeholder.com/300'}
                    alt={product.name}
                    className={`w-full object-cover ${compact ? 'h-32' : 'h-48'}`}
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300?text=Расм+нест';
                    }}
                />
            </div>
            <div className={`p-${compact ? '3' : '4'}`}>
                <h3
                    className={`font-bold mb-2 line-clamp-2 ${compact ? 'text-sm' : 'text-base'}`}
                    onClick={handleClick}
                >
                    {product.name}
                </h3>

                {!compact && (
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? 'fill-current' : ''}`} />
                            ))}
                        </div>
                        <span className="text-sm text-gray-600">({product.numReviews || 0})</span>
                    </div>
                )}

                <p className={`font-bold text-purple-600 mb-3 ${compact ? 'text-lg' : 'text-2xl'}`}>
                    {product.price} с.
                </p>

                <button
                    onClick={handleClick}
                    className={`w-full bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition ${compact ? 'py-1.5 text-sm' : 'py-2'}`}
                >
                    Дида бароед
                </button>
            </div>
        </div>
    );
};

export default ProductsPage;