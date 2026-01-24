// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { Truck, Shield, CreditCard, Package } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import HeroSlider from '../components/HeroSlider';

const HomePage = ({ setCurrentPage, setSelectedProduct }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/products`);
            const data = await res.json();

            if (data.success) {
                setProducts(data.products.slice(0, 8));
            }
        } catch (err) {
            console.error('Хатогӣ дар гирифтани маҳсулот:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Слайдери асосӣ */}
            <HeroSlider setCurrentPage={setCurrentPage} />

            {/* Хусусиятҳо */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
                {[
                    { icon: <Truck />, title: 'Ирсоли ройгон', desc: 'Барои фармоишҳои зиёда аз 200 сомонӣ' },
                    { icon: <Shield />, title: 'Кафолати сифат', desc: 'Ҳамаи маҳсулот бо кафолат' },
                    { icon: <CreditCard />, title: 'Пардохти бехатар', desc: 'Ҳамаи усулҳои пардохт' },
                    { icon: <Package />, title: 'Баргашти осон', desc: 'Дар давоми 14 рӯз' }
                ].map((feature, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-lg text-center">
                        <div className="text-purple-600 mb-3 flex justify-center">{feature.icon}</div>
                        <h3 className="font-bold mb-2">{feature.title}</h3>
                        <p className="text-gray-600 text-sm">{feature.desc}</p>
                    </div>
                ))}
            </div>

            {/* Маҳсулоти махсус */}
            <h2 className="text-3xl font-bold mb-6">Маҳсулоти махсус</h2>

            {loading ? (
                <div className="text-center py-12">Боргирӣ...</div>
            ) : (
                <div className="grid md:grid-cols-4 gap-6">
                    {products.map(product => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            setSelectedProduct={setSelectedProduct}
                            setCurrentPage={setCurrentPage}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;