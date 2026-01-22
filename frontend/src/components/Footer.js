import React from 'react';

const Footer = ({ setCurrentPage }) => {
    return (
        <footer className="bg-gray-800 text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">🛍️ ShopTJ</h3>
                        <p className="text-gray-400">Мағозаи интернетии беҳтарин дар Тоҷикистон</p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Пайвандҳо</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><button onClick={() => setCurrentPage('home')} className="hover:text-white">Асосӣ</button></li>
                            <li><button onClick={() => setCurrentPage('products')} className="hover:text-white">Маҳсулот</button></li>
                            <li><button onClick={() => setCurrentPage('about')} className="hover:text-white">Дар бораи мо</button></li>
                            <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white">Тамос</button></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Маълумот</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><button onClick={() => setCurrentPage('faq')} className="hover:text-white">Савол-Ҷавоб</button></li>
                            <li><button className="hover:text-white">Шартҳо</button></li>
                            <li><button className="hover:text-white">Махфият</button></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Тамос</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>📧 info@shoptj.com</li>
                            <li>📱 +992 900 00 00 00</li>
                            <li>📍 Душанбе, Тоҷикистон</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>© 2025 ShopTJ. Ҳамаи ҳуқуқҳо ҳифз шудаанд.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;