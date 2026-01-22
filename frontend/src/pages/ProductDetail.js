import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Star } from 'lucide-react';

const ProductDetail = ({ product, setCurrentPage }) => {
    const { addToCart } = useCart();
    const [loading, setLoading] = useState(false);

    if (!product) return null;

    const handleAddToCart = async () => {
        setLoading(true);
        const result = await addToCart(product, 1);
        setLoading(false);

        if (result.success) {
            setCurrentPage('cart');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <button
                onClick={() => setCurrentPage('products')}
                className="mb-6 text-purple-600 hover:underline"
            >
                ← Бозгашт
            </button>

            <div className="grid md:grid-cols-2 gap-12">
                <img
                    src={product.mainImage || 'https://via.placeholder.com/500'}
                    alt={product.name}
                    className="w-full rounded-2xl shadow-xl"
                />

                <div>
                    <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

                    <p className="text-4xl font-bold text-purple-600 mb-6">
                        {product.price} сомонӣ
                    </p>

                    <p className="text-gray-700 mb-6">{product.description}</p>

                    <button
                        onClick={handleAddToCart}
                        disabled={loading}
                        className="w-full py-4 rounded-xl text-lg font-bold bg-purple-600 text-white hover:bg-purple-700"
                    >
                        {loading ? 'Илова шуда истодааст...' : 'Ба сабад илова кунед'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
