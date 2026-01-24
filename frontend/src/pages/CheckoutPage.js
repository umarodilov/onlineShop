import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CheckoutPage = ({ setCurrentPage }) => {
    const { cart, total, clearCart } = useCart();
    const { user, token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        fullName: user?.name || '',
        phone: user?.phone || '',
        street: '',
        city: 'Душанбе',
        paymentMethod: 'cash'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!token) {
            alert('Барои супориш додан ворид шавед');
            setCurrentPage('auth');
            return;
        }

        if (!cart || cart.length === 0) {
            setError('Сабади шумо холӣ аст!');
            return;
        }

        if (!formData.fullName.trim() || !formData.phone.trim() || !formData.street.trim()) {
            setError('Лутфан ҳамаи майдонҳоро пур кунед');
            return;
        }

        setLoading(true);

        try {
            const orderData = {
                items: cart.map(item => ({
                    product: item._id,
                    name: item.name,
                    image: item.mainImage || '',
                    price: Number(item.price),
                    quantity: Number(item.quantity)
                })),
                shippingAddress: {
                    fullName: formData.fullName.trim(),
                    phone: formData.phone.trim(),
                    street: formData.street.trim(),
                    city: formData.city,
                    country: 'Тоҷикистон'
                },
                paymentMethod: formData.paymentMethod,
                itemsPrice: Number(total),
                shippingPrice: 0,
                taxPrice: 0,
                totalPrice: Number(total)
            };

            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(orderData)
            });

            const data = await res.json();

            if (res.ok && data.success) {
                alert(`✅ Фармоиш бо муваффақият сохта шуд!\n\nРақами фармоиш: ${data.order?.orderNumber || ''}\nҶамъ: ${total + 0} сомонӣ`);
                clearCart();
                setCurrentPage('home');
            } else {
                setError(data.message || 'Хатогӣ дар сохтани фармоиш');
                alert(`❌ Хато: ${data.message || 'Фармоиш сохта нашуд'}`);
            }
        } catch (err) {
            console.error('❌ Хатогӣ:', err);
            setError('Хатогӣ дар пайвасти бо сервер');
            alert('❌ Хато: Пайвасти бо сервер қатъ шуд');
        } finally {
            setLoading(false);
        }
    };

    if (!cart || cart.length === 0) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-20 text-center">
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
        <div className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">Супориш додан</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    ❌ {error}
                </div>
            )}

            <div className="bg-blue-50 p-6 rounded-xl mb-6">
                <h3 className="font-bold text-lg mb-4">Маҳсулоти шумо ({cart.length}):</h3>
                {cart.map(item => (
                    <div key={item._id} className="flex justify-between py-2 border-b border-blue-200">
                        <span>{item.name} × {item.quantity}</span>
                        <span className="font-bold">{item.price * item.quantity} с.</span>
                    </div>
                ))}
                <div className="flex justify-between pt-4 text-lg font-bold">
                    <span>Ҷамъ (бо ирсол):</span>
                    <span className="text-purple-600">{total + 0} сомонӣ</span>
                </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
                <div>
                    <label className="block font-bold mb-2">Номи шумо: *</label>
                    <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 outline-none"
                        placeholder="Ном ва насаб"
                        required
                        disabled={loading}
                    />
                </div>

                <div>
                    <label className="block font-bold mb-2">Телефон: *</label>
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 outline-none"
                        placeholder="+992 900 123 456"
                        required
                        disabled={loading}
                    />
                </div>

                <div>
                    <label className="block font-bold mb-2">Суроға: *</label>
                    <input
                        type="text"
                        value={formData.street}
                        onChange={(e) => setFormData({...formData, street: e.target.value})}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 outline-none"
                        placeholder="Кӯча, хона, квартира"
                        required
                        disabled={loading}
                    />
                </div>

                <div>
                    <label className="block font-bold mb-2">Шаҳр: *</label>
                    <select
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 outline-none"
                        required
                        disabled={loading}
                    >
                        <option value="Душанбе">Душанбе</option>
                        <option value="Хуҷанд">Хуҷанд</option>
                        <option value="Бохтар">Бохтар</option>
                        <option value="Кӯлоб">Кӯлоб</option>
                        <option value="Истаравшан">Истаравшан</option>
                        <option value="Турсунзода">Турсунзода</option>
                        <option value="Панҷакент">Панҷакент</option>
                        <option value="Ваҳдат">Ваҳдат</option>
                        <option value="Исфара">Исфара</option>
                        <option value="Ҳисор">Ҳисор</option>
                        <option value="Конибодом">Конибодом</option>
                        <option value="Гулистон">Гулистон</option>
                        <option value="Норак">Норак</option>
                        <option value="Роғун">Роғун</option>
                        <option value="Қӯрғонтеппа">Қӯрғонтеппа</option>
                    </select>
                </div>

                <div>
                    <label className="block font-bold mb-2">Усули пардохт:</label>
                    <select
                        value={formData.paymentMethod}
                        onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 outline-none"
                        disabled={loading}
                    >
                        <option value="cash">💵 Накд</option>
                        <option value="card">💳 Корт</option>
                        <option value="online">🌐 Онлайн</option>
                    </select>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition ${
                        loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                >
                    {loading ? '⏳ Дар ҳоли иҷро...' : `✅ Тасдиқ кунед (${total + 0} сомонӣ)`}
                </button>
            </div>
        </div>
    );
};

export default CheckoutPage;
