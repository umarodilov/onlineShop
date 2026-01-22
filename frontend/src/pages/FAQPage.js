// src/pages/FAQPage.js
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQPage = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            category: '🛒 Супориш ва харид',
            questions: [
                {
                    q: 'Чӣ тавр супориш кунам?',
                    a: 'Барои супориш кардан: 1) Маҳсулотро ба сабад илова кунед, 2) Ба сабад равед ва "Супориш додан"-ро пахш кунед, 3) Маълумоти худро пур кунед, 4) Фармоишро тасдиқ кунед. Мо дар давоми 24 соат бо шумо тамос мегирем.'
                },
                {
                    q: 'Оё метавонам фармоишро бекор кунам?',
                    a: 'Бале, то он лаҳзае ки маҳсулот ирсол нашудааст, шумо метавонед фармоишро бекор кунед. Барои ин ба "Профили ман" равед ва "Бекор кардан"-ро пахш кунед.'
                },
                {
                    q: 'Чанд вақт супориш иҷро мешавад?',
                    a: 'Аксари фармоишҳо дар давоми 24-48 соат иҷро мешаванд. Барои маҳсулоти махсус вақти тайёрӣ то 5 рӯзи корӣ метавонад бошад.'
                }
            ]
        },
        {
            category: '💳 Пардохт',
            questions: [
                {
                    q: 'Кадом усулҳои пардохт қабул мекунед?',
                    a: 'Мо усулҳои зеринро қабул мекунем: 1) Пардохти накд ҳангоми гирифтани маҳсулот, 2) Пардохт бо корти бонкӣ, 3) Пардохти онлайн. Ҳамаи усулҳои пардохт бехатар ҳастанд.'
                },
                {
                    q: 'Оё метавонам қарз харидам?',
                    a: 'Бале, барои маҳсулоти зиёда аз 3000 сомонӣ мо қарзи 3-6-12 моҳа пешниҳод мекунем. Барои ин шумо бояд санади шахсӣ ва маълумоти корӣ пешниҳод кунед.'
                },
                {
                    q: 'Оё пардохт бехатар аст?',
                    a: 'Бале, мо аз технологияи рамзгузории SSL истифода мебарем. Ҳамаи маълумоти пардохти шумо махфӣ аст ва ба шахси сеюм дода намешавад.'
                }
            ]
        },
        {
            category: '🚚 Ирсол ва таҳвилдиҳӣ',
            questions: [
                {
                    q: 'Чанд пул ирсол мегирад?',
                    a: 'Ирсол дар дохили Душанбе 50 сомонӣ аст. Барои вилоятҳо нархи ирсол аз 70 то 150 сомонӣ вобаста ба масофа. Барои фармоишҳои зиёда аз 500 сомонӣ ирсол ройгон аст.'
                },
                {
                    q: 'Чанд вақт маҳсулот мерасад?',
                    a: 'Дар Душанбе: 1-2 рӯз, Дар шаҳрҳои вилоятӣ: 3-5 рӯз, Дар ноҳияҳо: 5-7 рӯз. Вақти дақиқро ҳангоми тасдиқи фармоиш ба шумо мегӯем.'
                },
                {
                    q: 'Чӣ тавр фармоишро пайгирӣ кунам?',
                    a: 'Баъд аз супориш шумо рақами фармоиш мегиред. Бо ин рақам дар "Профили ман" метавонед статуси фармоишро бинед. Ҳамчунин мо бо SMS ва WhatsApp маълумот медиҳем.'
                }
            ]
        },
        {
            category: '🔄 Баргашт ва иваз',
            questions: [
                {
                    q: 'Оё метавонам маҳсулотро баргардонам?',
                    a: 'Бале, дар давоми 14 рӯз баъд аз гирифтани маҳсулот шумо метавонед онро баргардонед, агар: маҳсулот истифода нашуда бошад, қуттӣ ва ҳамаи ҳуҷҷатҳо сар ҷой бошанд, маҳсулот нуқси техникӣ дошта бошад.'
                },
                {
                    q: 'Чӣ тавр маҳсулотро иваз кунам?',
                    a: 'Барои иваз кардан бо мо тамос гиред ва далелро шарҳ диҳед. Мо маҳсулотро санҷида, онро иваз мекунем ё пули шуморо баргардонем.'
                },
                {
                    q: 'Кай пулро баргардонед?',
                    a: 'Пул дар давоми 7-14 рӯзи корӣ баъд аз қабули маҳсулоти баргардонида ба ҳисоби шумо баргардонида мешавад.'
                }
            ]
        },
        {
            category: '🛡️ Кафолат ва хизматрасонӣ',
            questions: [
                {
                    q: 'Оё маҳсулот бо кафолат аст?',
                    a: 'Бале, ҳамаи маҳсулоти мо бо кафолати расмӣ фурӯхта мешаванд. Муддати кафолат вобаста ба навъи маҳсулот аз 6 моҳ то 2 сол аст.'
                },
                {
                    q: 'Агар маҳсулот вайрон шавад чӣ кунам?',
                    a: 'Агар маҳсулот дар давоми муддати кафолат вайрон шавад, мо онро ройгон таъмир мекунем ё иваз мекунем. Барои ин варақаи кафолат ва чеки харидро овардан лозим аст.'
                },
                {
                    q: 'Оё маҳсулотро тест карда метавонам?',
                    a: 'Бале, ҳангоми гирифтани маҳсулот шумо метавонед онро санҷед. Агар маҳсулот нуқс дошта бошад, шумо метавонед онро қабул накунед.'
                }
            ]
        }
    ];

    const toggleFAQ = (catIndex, qIndex) => {
        const index = `${catIndex}-${qIndex}`;
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <HelpCircle className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                <h1 className="text-5xl font-bold mb-4">Савол-Ҷавоб</h1>
                <p className="text-xl text-gray-600">
                    Ҷавобҳои саволҳои маъмултарин дар ин ҷо
                </p>
            </div>

            {faqs.map((category, catIndex) => (
                <div key={catIndex} className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
                    <div className="space-y-3">
                        {category.questions.map((faq, qIndex) => {
                            const index = `${catIndex}-${qIndex}`;
                            const isOpen = openIndex === index;

                            return (
                                <div key={qIndex} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <button
                                        onClick={() => toggleFAQ(catIndex, qIndex)}
                                        className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition"
                                    >
                                        <span className="font-bold text-lg pr-4">{faq.q}</span>
                                        {isOpen ? (
                                            <ChevronUp className="w-6 h-6 text-purple-600 flex-shrink-0" />
                                        ) : (
                                            <ChevronDown className="w-6 h-6 text-purple-600 flex-shrink-0" />
                                        )}
                                    </button>
                                    {isOpen && (
                                        <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}

            {/* Contact CTA */}
            <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-xl text-center">
                <h2 className="text-2xl font-bold mb-4">Ҷавоби саволатонро наёфтед?</h2>
                <p className="mb-6">Бо мо тамос гиред ва мо бо хурсандӣ ба шумо кумак мекунем!</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="tel:+992900123456" className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
                        📞 Занг занед
                    </a>
                    <a href="mailto:support@shoptj.com" className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
                        ✉️ Email фиристед
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;