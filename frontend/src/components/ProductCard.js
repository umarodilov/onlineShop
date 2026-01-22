// src/components/ProductCard.js
import React, { useState } from 'react';
import { ShoppingCart, Star, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart, error, setError } = useCart();
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleAddToCart = async () => {
        setLoading(true);
        setError('');

        const result = await addToCart(product, 1);

        if (result.success) {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
        }

        setLoading(false);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img
                src={product.mainImage}
                alt={product.name}
                className="w-full h-48 object-cover"
            />

            <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>

                <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-purple-600">
                        {product.price} с.
                    </span>

                    {product.rating > 0 && (
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{product.rating}</span>
                        </div>
                    )}
                </div>

                {/* Намоиши stock */}
                <div className="mb-3">
                    {product.stock > 0 ? (
                        <p className="text-sm text-gray-600">
                            Дар анбор: <span className="font-semibold text-green-600">
                                {product.stock} дона
                            </span>
                        </p>
                    ) : (
                        <p className="text-sm text-red-600 font-semibold">
                            Тамом шудааст
                        </p>
                    )}
                </div>

                {/* Хатогӣ */}
                {error && (
                    <div className="mb-3 p-2 bg-red-100 border border-red-300 rounded-lg flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-red-700">{error}</p>
                    </div>
                )}

                {/* Паёми муваффақият */}
                {showSuccess && (
                    <div className="mb-3 p-2 bg-green-100 border border-green-300 rounded-lg">
                        <p className="text-xs text-green-700 font-medium">
                            ✓ Ба cart илова шуд
                        </p>
                    </div>
                )}

                <button
                    onClick={handleAddToCart}
                    disabled={loading || product.stock === 0}
                    className={`
                        w-full py-3 rounded-lg font-semibold
                        flex items-center justify-center gap-2
                        transition
                        ${product.stock === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }
                        ${loading ? 'opacity-50 cursor-wait' : ''}
                    `}
                >
                    <ShoppingCart className="w-5 h-5" />
                    {loading ? 'Илова шуда истодааст...' :
                        product.stock === 0 ? 'Тамом шудааст' : 'Ба cart'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;