import React, { useState, useEffect, useCallback } from 'react';
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

    // ✅ applyFilters-ро useCallback мекунем, то ESLint warning надиҳад
    const applyFilters = useCallback(() => {
        let filtered = [...products];

        if (selectedCategory) {
            filtered = filtered.filter((p) => {
                if (p.category?._id) return p.category._id === selectedCategory;
                return p.category === selectedCategory;
            });
        }

        if (minPrice) filtered = filtered.filter((p) => p.price >= Number(minPrice));
        if (maxPrice) filtered = filtered.filter((p) => p.price <= Number(maxPrice));

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
    }, [products, selectedCategory, minPrice, maxPrice, sortBy]);

    // ✅ fetchData-ро ҳам useCallback мекунем (барои dependency-и useEffect дуруст шавад)
    const fetchData = useCallback(async () => {
        try {
            const [productsRes, categoriesRes] = await Promise.all([
                fetch(`${process.env.REACT_APP_API_URL}/api/products`),
                fetch(`${process.env.REACT_APP_API_URL}/api/categories`)
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
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        applyFilters();
        setCurrentPageNum(1);
    }, [applyFilters]);

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
                    src={`${process.env.REACT_APP_API_URL}${product.mainImage}` || 'https://via.placeholder.com/300'}
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