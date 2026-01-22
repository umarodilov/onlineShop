// src/pages/ContactPage.js
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Loader } from 'lucide-react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                setSubmitted(true);
                setFormData({ name: '', email: '', subject: '', message: '' });

                // Пинҳон кардани паёми муваффақият баъд аз 5 сония
                setTimeout(() => {
                    setSubmitted(false);
                }, 5000);
            } else {
                setError(data.message || 'Хатогӣ рух дод');
            }
        } catch (err) {
            console.error('Хатогӣ:', err);
            setError('Хатогӣ дар пайвастшавӣ ба сервер. Лутфан баъдтар кӯшиш кунед.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4">Тамос бо мо</h1>
                <p className="text-xl text-gray-600">
                    Мо ҳамеша омодаем ба шумо кумак кунем. Савол доред? Бо мо тамос гиред!
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div>
                    <h2 className="text-3xl font-bold mb-6">Маълумоти тамос</h2>

                    <div className="space-y-6">
                        <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg">
                            <MapPin className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-lg mb-2">Суроға</h3>
                                <p className="text-gray-700">
                                    Душанбе, кӯчаи Рӯдакӣ 123<br />
                                    Бинои "Бизнес Центр", ошёнаи 5<br />
                                    Тоҷикистон, 734000
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg">
                            <Phone className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-lg mb-2">Телефон</h3>
                                <p className="text-gray-700">
                                    +992 900 12 34 56<br />
                                    +992 37 221 00 00<br />
                                    Ҳар рӯз: 9:00 - 20:00
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg">
                            <Mail className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-lg mb-2">Email</h3>
                                <p className="text-gray-700">
                                    info@shoptj.com<br />
                                    support@shoptj.com<br />
                                    Ҷавоб дар давоми 24 соат
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg">
                            <Clock className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-lg mb-2">Вақти корӣ</h3>
                                <p className="text-gray-700">
                                    Душанбе - Ҷумъа: 9:00 - 20:00<br />
                                    Шанбе: 10:00 - 18:00<br />
                                    Якшанбе: Истироҳат
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
                        <h3 className="font-bold text-lg mb-4">Мо дар шабакаҳои иҷтимоӣ</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition">
                                F
                            </a>
                            <a href="#" className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition">
                                T
                            </a>
                            <a href="#" className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition">
                                I
                            </a>
                            <a href="#" className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition">
                                W
                            </a>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white p-8 rounded-xl shadow-xl">
                    <h2 className="text-3xl font-bold mb-6">Паём фиристед</h2>

                    {/* Success Message */}
                    {submitted && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 animate-fade-in">
                            ✅ Паёми шумо бо муваффақият ирсол шуд! Мо ба зудӣ ҷавоб медиҳем.
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                            ❌ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block font-bold mb-2">Номи шумо *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 outline-none"
                                placeholder="Ном ва насаб"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label className="block font-bold mb-2">Email *</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 outline-none"
                                placeholder="your@email.com"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label className="block font-bold mb-2">Мавзӯъ *</label>
                            <select
                                value={formData.subject}
                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 outline-none"
                                required
                                disabled={loading}
                            >
                                <option value="">Интихоб кунед...</option>
                                <option value="order">Савол оид ба фармоиш</option>
                                <option value="product">Савол оид ба маҳсулот</option>
                                <option value="payment">Савол оид ба пардохт</option>
                                <option value="delivery">Савол оид ба ирсол</option>
                                <option value="complaint">Шикоят</option>
                                <option value="suggestion">Пешниҳод</option>
                                <option value="other">Дигар</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-bold mb-2">Паёми шумо *</label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 outline-none h-32 resize-none"
                                placeholder="Паёми худро нависед..."
                                required
                                disabled={loading}
                                minLength={10}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Камаш 10 ҳарф ({formData.message.length}/10)
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-purple-700 transition flex items-center justify-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader className="w-5 h-5 animate-spin" />
                                    <span>Ирсол шуда истодааст...</span>
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    <span>Ирсол кардан</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Map Section */}
            {/* Map Section - Бо нуқтаи дақиқ */}
            {/* Map Section - Бо placeholder ва линк */}
            <div className="mt-12 bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="relative">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47959.356789!2d69.62!3d40.28!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38b21500b6c6c1af%3A0x8e4e1e5e1e5e1e5e!2z0KXRg9K30LDQvdC0!5e0!3m2!1sru!2stj!4v1234567890"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Хуҷанд, Амир Шолкомбинот"
                        className="w-full h-96"
                    />

                    {/* Overlay бо маълумот */}
                    <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white p-4 rounded-lg shadow-lg">
                        <div className="flex items-start space-x-3">
                            <MapPin className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-sm mb-1">Суроғаи мо</h3>
                                <p className="text-xs text-gray-600">
                                    Хуҷанд, кӯчаи Амир Шолкомбинот<br />
                                    Вилояти Суғд, Тоҷикистон
                                </p>
                                <a
                                    href="https://www.google.com/maps/search/Хуҷанд+Амир+Шолкомбинот/@40.28,69.62,15z"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-600 text-xs hover:underline mt-2 inline-block"
                                >
                                    Дар Google Maps кушодан →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*<div className="mt-12 bg-white rounded-xl shadow-xl overflow-hidden">*/}
            {/*    /!* Header *!/*/}
            {/*    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">*/}
            {/*        <h3 className="text-2xl font-bold flex items-center gap-2">*/}
            {/*            <MapPin className="w-6 h-6" />*/}
            {/*            Мо дар харита*/}
            {/*        </h3>*/}
            {/*        <p className="text-purple-100 mt-2">*/}
            {/*            Хуҷанд, кӯчаи Амир Шолкомбинот*/}
            {/*        </p>*/}
            {/*    </div>*/}

            {/*    /!* Map *!/*/}
            {/*    <iframe*/}
            {/*        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.0!2d69.6235!3d40.2787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDE2JzQzLjMiTiA2OcKwMzcnMjQuNiJF!5e0!3m2!1sru!2stj!4v1234567890"*/}
            {/*        width="100%"*/}
            {/*        height="450"*/}
            {/*        style={{ border: 0 }}*/}
            {/*        allowFullScreen=""*/}
            {/*        loading="lazy"*/}
            {/*        referrerPolicy="no-referrer-when-downgrade"*/}
            {/*        title="Хуҷанд"*/}
            {/*        className="w-full h-96"*/}
            {/*    />*/}

            {/*    /!* Footer бо дастурамал *!/*/}
            {/*    <div className="p-4 bg-gray-50 flex flex-wrap gap-4 justify-center">*/}
            {/*        <a*/}
            {/*            href="https://www.google.com/maps/dir/?api=1&destination=40.2787,69.6235"*/}
            {/*            target="_blank"*/}
            {/*            rel="noopener noreferrer"*/}
            {/*            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium"*/}
            {/*        >*/}
            {/*            Роҳнамо гирифтан*/}
            {/*        </a>*/}
            {/*        <a*/}
            {/*            href="https://www.google.com/maps/search/?api=1&query=Хуҷанд+Амир+Шолкомбинот"*/}
            {/*            target="_blank"*/}
            {/*            rel="noopener noreferrer"*/}
            {/*            className="px-6 py-2 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition text-sm font-medium"*/}
            {/*        >*/}
            {/*            Дар Google Maps кушодан*/}
            {/*        </a>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};
export default ContactPage;