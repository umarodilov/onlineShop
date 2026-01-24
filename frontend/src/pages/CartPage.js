import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';

const CartPage = ({ setCurrentPage }) => {
    const { cart, removeFromCart, updateQuantity, total, error } = useCart();
    const [loadingItems, setLoadingItems] = useState({});
    const fallbackImg = "https://via.placeholder.com/100";
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
                {/* LEFT: Cart items */}
                <div className="md:col-span-2 space-y-4">
                    {cart.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white p-4 sm:p-6 rounded-xl shadow-lg"
                        >
                            {/* Top row: image + title/price + delete */}
                            <div className="grid grid-cols-[72px_1fr_auto] sm:grid-cols-[96px_1fr_auto] gap-3 sm:gap-5 items-start">
                                <img
                                    src={item.mainImage || fallbackImg}
                                    onError={(e) => {
                                        e.currentTarget.src = fallbackImg;
                                    }}
                                    alt=""
                                    className="w-[72px] h-[72px] sm:w-24 sm:h-24 object-cover rounded-lg bg-gray-100"
                                />

                                <div className="min-w-0">
                                    <h3 className="font-bold text-sm sm:text-lg leading-snug break-words">
                                        {item.name}
                                    </h3>
                                    <p className="text-purple-600 font-bold text-base sm:text-xl mt-1">
                                        {item.price} сомонӣ
                                    </p>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    className="text-red-600 hover:text-red-700"
                                    aria-label="Remove"
                                >
                                    <Trash2 className="w-5 h-5 sm:w-6 sm:h-6" />
                                </button>
                            </div>

                            {/* Bottom row: quantity controls */}
                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                                        disabled={loadingItems[item._id] || item.quantity <= 1}
                                        className="w-9 h-9 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                        aria-label="Minus"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>

                                    <span className="font-bold min-w-[2rem] text-center">
                                      {item.quantity}
                                    </span>

                                    <button
                                        onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                                        disabled={loadingItems[item._id]}
                                        className="w-9 h-9 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                        aria-label="Plus"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Optional: item total on right */}
                                <div className="text-sm sm:text-base font-semibold text-gray-700">
                                    {(item.price * item.quantity).toFixed(0)} с.
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* RIGHT: Summary */}
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg h-fit md:sticky md:top-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4">Ҷамъ</h2>

                    <div className="space-y-2 mb-6 text-sm sm:text-base">
                        <div className="flex justify-between">
                            <span>Маҳсулот:</span>
                            <span>{total} с.</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Ирсол:</span>
                            <span>0 с.</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-bold text-lg sm:text-xl">
                            <span>Ҷамъ:</span>
                            <span className="text-purple-600">{total} с.</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setCurrentPage("checkout")}
                        className="w-full bg-purple-600 text-white py-3 sm:py-4 rounded-xl font-bold hover:bg-purple-700 active:scale-[0.99] transition"
                    >
                        Супориш додан
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
