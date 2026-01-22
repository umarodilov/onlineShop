// src/pages/AboutPage.js
import React from 'react';
import { Store, Users, Award, Truck } from 'lucide-react';

const AboutPage = ({ setCurrentPage }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-4">Дар бораи ShopTJ</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Мо мағозаи интернетии беҳтарин дар Тоҷикистон ҳастем. Маҳсулоти боифат бо нархҳои муносиб!
                </p>
            </div>

            {/* Story Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                <h2 className="text-3xl font-bold mb-6 text-purple-600">Таърихи мо</h2>
                <div className="prose max-w-none">
                    <p className="text-lg text-gray-700 mb-4">
                        ShopTJ дар соли 2024 бо мақсади осон кардани хариди онлайн дар Тоҷикистон таъсис ёфт.
                        Мо мехостем, ки ҳар як тоҷикистонӣ аз хонааш маҳсулоти сифатноки ҷаҳонӣ харида тавонад.
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                        Аз рӯзи аввал, мо ба сифат ва хизматрасонии муштариён таваҷҷӯҳи махсус дорем.
                        Имрӯз мо бо садҳо миштариёни разоманд кор мекунем ва ҳар рӯз мо калонтар мешавем.
                    </p>
                    <p className="text-lg text-gray-700">
                        Ҳадафи мо ин аст, ки мағозаи интернетии беҳтарин дар Осиёи Марказӣ бошем
                        ва ба ҳар як хонадон имконияти дастрасӣ ба технологияи навро пешниҳод кунем.
                    </p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-xl text-center">
                    <Store className="w-12 h-12 mx-auto mb-4" />
                    <div className="text-4xl font-bold mb-2">1000+</div>
                    <div className="text-lg">Маҳсулот</div>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-xl text-center">
                    <Users className="w-12 h-12 mx-auto mb-4" />
                    <div className="text-4xl font-bold mb-2">5000+</div>
                    <div className="text-lg">Муштариён</div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-xl text-center">
                    <Award className="w-12 h-12 mx-auto mb-4" />
                    <div className="text-4xl font-bold mb-2">100%</div>
                    <div className="text-lg">Кафолат</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-8 rounded-xl text-center">
                    <Truck className="w-12 h-12 mx-auto mb-4" />
                    <div className="text-4xl font-bold mb-2">24/7</div>
                    <div className="text-lg">Ирсол</div>
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                <h2 className="text-3xl font-bold mb-6 text-purple-600">Арзишҳои мо</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-3">🎯 Сифат</h3>
                        <p className="text-gray-700">
                            Мо танҳо маҳсулоти боифат ва бо сертификат пешниҳод мекунем.
                            Ҳар як маҳсулот пеш аз фурӯш санҷида мешавад.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-3">🤝 Боварӣ</h3>
                        <p className="text-gray-700">
                            Муштариён ба мо бовар мекунанд, чунки мо ҳамеша шаффоф ва содиқ
                            ба ваъдаҳоямон ҳастем.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-3">⚡ Суръат</h3>
                        <p className="text-gray-700">
                            Мо супоришҳоро тез иҷро мекунем. Аксари фармоишҳо дар давоми
                            24 соат ирсол мешаванд.
                        </p>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold mb-6 text-purple-600 text-center">Дастаи мо</h2>
                <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                    Дастаи мо аз мутахассисони ҷавони тоҷик иборат аст, ки кори худро дӯст доранд
                    ва барои пешрафти Тоҷикистон меҷангнад.
                </p>
                <div className="grid md:grid-cols-4 gap-6">
                    {[
                        { name: 'Алишер Раҳимов', role: 'Асосгузор', image: '👨‍💼' },
                        { name: 'Нигора Юсуфӣ', role: 'Мудири маҳсулот', image: '👩‍💼' },
                        { name: 'Фарход Қосимов', role: 'Мудири техникӣ', image: '👨‍💻' },
                        { name: 'Зебо Аҳмадова', role: 'Мудири маркетинг', image: '👩‍💻' }
                    ].map((member, idx) => (
                        <div key={idx} className="text-center">
                            <div className="text-6xl mb-4">{member.image}</div>
                            <h3 className="font-bold text-lg">{member.name}</h3>
                            <p className="text-gray-600">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12 text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white p-12 rounded-2xl">
                <h2 className="text-3xl font-bold mb-4">Омода барои харид?</h2>
                <p className="text-xl mb-6">Ба ҳазорҳо муштариёни разомандаи мо ҳамроҳ шавед!</p>
                <button
                    onClick={() => setCurrentPage('products')}
                    className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition"
                >
                    Оғози харид
                </button>
            </div>
        </div>
    );
};

export default AboutPage;