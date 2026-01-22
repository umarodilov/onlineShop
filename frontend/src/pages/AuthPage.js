import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthPage = ({ setCurrentPage }) => {
    const [isLogin, setIsLogin] = useState(true);
    const { login, register } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = isLogin
                ? await login(formData.email, formData.password)
                : await register(formData);

            if (result.success) {
                alert(result.message);
                setCurrentPage('home');
            } else {
                alert(result.message);
            }
        } catch (err) {
            alert('Хато: ' + err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-8">
                    {isLogin ? 'Воридшавӣ' : 'Бақайдгирӣ'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="block font-bold mb-2">Ном:</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 outline-none"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block font-bold mb-2">Email:</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-bold mb-2">Рамз:</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 outline-none"
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div>
                            <label className="block font-bold mb-2">Телефон:</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 outline-none"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700"
                    >
                        {isLogin ? 'Ворид шудан' : 'Бақайдгирӣ кардан'}
                    </button>
                </form>

                <p className="text-center mt-6">
                    {isLogin ? 'Ҳисоб надоред?' : 'Аллакай ҳисоб доред?'}{' '}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-purple-600 font-bold hover:underline"
                    >
                        {isLogin ? 'Бақайдгирӣ' : 'Воридшавӣ'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;
