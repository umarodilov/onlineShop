// src/components/SearchModal.js
import React, { useEffect } from 'react';
import { Search, X, Star } from 'lucide-react';
import { useSearch } from '../context/SearchContext';

const SearchModal = ({ setCurrentPage, setSelectedProduct }) => {
    const {
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        searchResults,
        loading,
        performSearch,
    } = useSearch();

    // Debounced search
    useEffect(() => {
        if (!isSearchOpen) return;

        const timeoutId = setTimeout(() => {
            if (performSearch) {
                performSearch(searchQuery);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, isSearchOpen, performSearch]);

    if (!isSearchOpen) return null;

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setCurrentPage('product-detail');
        setIsSearchOpen(false);
        setSearchQuery('');
    };

    return (
        <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div
                onClick={() => setIsSearchOpen(false)}
                className="absolute inset-0 bg-black/40"
            />

            {/* Bottom Sheet */}
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col animate-slideUp">
                {/* Handle */}
                <div className="flex justify-center py-2">
                    <div className="w-10 h-1.5 bg-gray-300 rounded-full" />
                </div>

                {/* Search Input */}
                <div className="px-4 pb-3 flex items-center gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Ҷустуҷӯи маҳсулот..."
                            autoFocus
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 outline-none text-[15px]"
                        />
                    </div>

                    <button
                        onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery('');
                        }}
                        className="p-2 rounded-full hover:bg-gray-100"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Results */}
                <div className="flex-1 overflow-y-auto px-3 pb-4">
                    {loading ? (
                        <div className="py-12 text-center text-gray-500">
                            Ҷустуҷӯ...
                        </div>
                    ) : searchQuery.trim().length < 2 ? (
                        <div className="py-12 text-center text-gray-400 text-sm">
                            Камаш 2 ҳарф нависед
                        </div>
                    ) : searchResults.length === 0 ? (
                        <div className="py-12 text-center text-gray-500">
                            😔 Ёфт нашуд
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {searchResults.map((product) => (
                                <button
                                    key={product._id}
                                    onClick={() => handleProductClick(product)}
                                    className="w-full flex gap-3 p-3 rounded-xl text-left active:bg-purple-50"
                                >
                                    <img
                                        src={product.mainImage}
                                        alt={product.name}
                                        className="w-16 h-16 rounded-lg object-cover"
                                    />

                                    <div className="flex-1">
                                        <p className="font-medium text-sm leading-snug">
                                            {product.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {typeof product.category === 'string'
                                                ? product.category
                                                : product.category?.name}
                                        </p>

                                        <div className="flex items-center justify-between mt-1">
                                            <span className="font-semibold text-purple-600 text-sm">
                                                {product.price} с.
                                            </span>

                                            {product.rating > 0 && (
                                                <div className="flex items-center gap-1 text-xs text-gray-600">
                                                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                                    {product.rating.toFixed(1)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default SearchModal;
