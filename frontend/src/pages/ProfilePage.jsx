// src/pages/ProfilePage.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, User, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ProfilePage = ({ setCurrentPage }) => {
    const { user, token, updateProfile } = useAuth();

    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [error, setError] = useState('');

    // Edit profile
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    // Вақте user омад -> поляҳоро пур кун
    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setPhone(user.phone || '');
        }
    }, [user]);

    // Fetch orders
    useEffect(() => {
        if (!token) {
            console.log('❌ Токен нест - ба auth меравем');
            setCurrentPage('auth');
            return;
        }
        fetchOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const fetchOrders = async () => {
        try {
            setLoadingOrders(true);
            setError('');

            const res = await fetch(`${API_URL}/api/orders/my-orders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || `HTTP ${res.status}`);
            }

            const data = await res.json();

            if (data.success && Array.isArray(data.orders)) {
                setOrders(data.orders);
            } else {
                setOrders([]);
            }
        } catch (err) {
            console.error('❌ Хатогӣ дар бор кардани фармоишҳо:', err);
            setError(err.message || 'Хатогӣ дар бор кардани фармоишҳо');
            setOrders([]);
        } finally {
            setLoadingOrders(false);
        }
    };

    // Status color
    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            processing: 'bg-blue-100 text-blue-800',
            shipped: 'bg-purple-100 text-purple-800',
            delivered: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    // Status icon
    const getStatusIcon = (status) => {
        const icons = {
            pending: <Clock className="w-4 h-4" />,
            processing: <Package className="w-4 h-4" />,
            shipped: <Truck className="w-4 h-4" />,
            delivered: <CheckCircle className="w-4 h-4" />,
            cancelled: <XCircle className="w-4 h-4" />
        };
        return icons[status] || <Package className="w-4 h-4" />;
    };

    // Status text
    const getStatusText = (status) => {
        const texts = {
            pending: 'Интизор',
            processing: 'Дар ҳоли иҷро',
            shipped: 'Ирсол шуд',
            delivered: 'Таҳвил дода шуд',
            cancelled: 'Бекор шуд'
        };
        return texts[status] || status;
    };

    // Агар token нест
    if (!token || !user) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-bold mb-4">Лутфан ворид шавед</h2>
                <button
                    onClick={() => setCurrentPage('auth')}
                    className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700"
                >
                    Воридшавӣ
                </button>
            </div>
        );
    }

    const onSaveProfile = async (e) => {
        e.preventDefault();
        if (saving) return;

        try {
            setSaving(true);

            const res = await updateProfile({
                name: name.trim(),
                phone: phone.trim()
            });

            if (res?.success) {
                alert('✅ Профил нав шуд');
                setEditing(false);
            } else {
                alert(res?.message || '❌ Навсозӣ нашуд');
            }
        } finally {
            setSaving(false);
        }
    };

    const onCancelEdit = () => {
        setEditing(false);
        setName(user?.name || '');
        setPhone(user?.phone || '');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">Профили ман</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    ❌ {error}
                    <button onClick={fetchOrders} className="ml-4 underline">
                        Боз кӯшиш кунед
                    </button>
                </div>
            )}

            <div className="grid md:grid-cols-3 gap-8">
                {/* User Info */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="text-center mb-6">
                        <div className="w-24 h-24 bg-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <User className="w-12 h-12 text-purple-600" />
                        </div>
                        <h2 className="text-2xl font-bold">{user?.name}</h2>
                        <p className="text-gray-600">{user?.email}</p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Телефон:</span>
                            <span className="font-bold">{user?.phone || 'Сабт нест'}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-600">Нақш:</span>
                            <span
                                className={`font-bold capitalize px-2 py-1 rounded ${
                                    user?.role === 'admin'
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-blue-100 text-blue-800'
                                }`}
                            >
                {user?.role === 'admin' ? '👑 Админ' : '👤 Корбар'}
              </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-600">Фармоишҳо:</span>
                            <span className="font-bold">{orders.length}</span>
                        </div>
                    </div>

                    {!editing ? (
                        <button
                            className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
                            onClick={() => setEditing(true)}
                        >
                            Таҳрири профил
                        </button>
                    ) : (
                        <form className="mt-6 space-y-3" onSubmit={onSaveProfile}>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Ном</label>
                                <input
                                    className="w-full p-3 border rounded-lg"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Ном"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Телефон</label>
                                <input
                                    className="w-full p-3 border rounded-lg"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Телефон"
                                />
                            </div>

                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-60"
                                >
                                    {saving ? 'Захира...' : 'Захира кардан'}
                                </button>

                                <button
                                    type="button"
                                    onClick={onCancelEdit}
                                    className="flex-1 border px-4 py-2 rounded-lg"
                                >
                                    Бекор
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Orders */}
                <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Фармоишҳои ман</h2>
                        {!loadingOrders && orders.length > 0 && (
                            <button onClick={fetchOrders} className="text-purple-600 hover:text-purple-700 text-sm">
                                🔄 Нав кардан
                            </button>
                        )}
                    </div>

                    {loadingOrders ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                            <p className="mt-4 text-gray-500">Бор шуда истодааст...</p>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                            <p className="text-xl mb-2">Шумо ҳоло фармоиш надоред</p>
                            <p className="text-sm mb-4">Харид кунед ва фармоиши аввалинро созед!</p>
                            <button
                                onClick={() => setCurrentPage('products')}
                                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
                            >
                                Оғози харид
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div
                                    key={order._id}
                                    className="border-2 border-gray-200 hover:border-purple-300 rounded-xl p-6 transition cursor-pointer"
                                    onClick={() => setCurrentPage('order-detail')}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="font-bold text-lg">#{order.orderNumber}</p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(order.createdAt).toLocaleDateString('tg-TJ', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="font-bold text-2xl text-purple-600">{order.totalPrice} сомонӣ</p>
                                            <span
                                                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                                    order.status
                                                )}`}
                                            >
                        {getStatusIcon(order.status)}
                                                {getStatusText(order.status)}
                      </span>
                                        </div>
                                    </div>

                                    <div className="border-t pt-4">
                                        <p className="text-sm text-gray-600 mb-2">Маҳсулот: {order.items?.length || 0} дона</p>
                                        <div className="flex flex-wrap gap-2">
                                            {order.items?.slice(0, 3).map((item, idx) => (
                                                <span key={idx} className="text-sm bg-gray-100 px-2 py-1 rounded">
                          {item.name} × {item.quantity}
                        </span>
                                            ))}
                                            {order.items?.length > 3 && (
                                                <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                          +{order.items.length - 3} дигар
                        </span>
                                            )}
                                        </div>
                                    </div>

                                    {order.shippingAddress && (
                                        <div className="border-t mt-4 pt-4 text-sm text-gray-600">
                                            <p>
                                                📍 {order.shippingAddress.city}, {order.shippingAddress.street}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
