import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';

const CartPage = ({ setCurrentPage }) => {
    const { cart, removeFromCart, updateQuantity, total, error } = useCart();
    const [loadingItems, setLoadingItems] = useState({});

    const handleUpdateQuantity = async (id, newQuantity) => {
        if (newQuantity < 1) return;

        setLoadingItems(prev => ({ ...prev, [id]: true }));
        await updateQuantity(id, newQuantity);
        setLoadingItems(prev => ({ ...prev, [id]: false }));
    };

    if (cart.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
                <h2 className="text-3xl font-bold mb-4">Сабади шумо холӣ аст</h2>
                <button
                    onClick={() => setCurrentPage('products')}
                    className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700"
                >
                    Харид кунед
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">Сабади харид</h1>

            {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
                    ❌ {error}
                </div>
            )}

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                    {cart.map(item => (
                        <div
                            key={item._id}
                            className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-6"
                        >
                            <img
                                src={item.mainImage || 'https://via.placeholder.com/100'}
                                alt={item.name}
                                className="w-24 h-24 object-cover rounded-lg"
                            />

                            <div className="flex-1">
                                <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                                <p className="text-purple-600 font-bold text-xl">
                                    {item.price} сомонӣ
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() =>
                                        handleUpdateQuantity(item._id, item.quantity - 1)
                                    }
                                    disabled={loadingItems[item._id]}
                                    className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center justify-center"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>

                                <span className="font-bold min-w-[2rem] text-center">
                  {item.quantity}
                </span>

                                <button
                                    onClick={() =>
                                        handleUpdateQuantity(item._id, item.quantity + 1)
                                    }
                                    disabled={loadingItems[item._id]}
                                    className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center justify-center"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            <button
                                onClick={() => removeFromCart(item._id)}
                                className="text-red-600 hover:text-red-700"
                            >
                                <Trash2 className="w-6 h-6" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg h-fit">
                    <h2 className="text-2xl font-bold mb-4">Ҷамъ</h2>

                    <div className="space-y-2 mb-6">
                        <div className="flex justify-between">
                            <span>Маҳсулот:</span>
                            <span>{total} с.</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Ирсол:</span>
                            <span>0 с.</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-bold text-xl">
                            <span>Ҷамъ:</span>
                            <span className="text-purple-600">{total} с.</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setCurrentPage('checkout')}
                        className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold hover:bg-purple-700"
                    >
                        Супориш додан
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
