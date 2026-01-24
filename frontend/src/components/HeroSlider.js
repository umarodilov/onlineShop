// src/components/HeroSlider.js
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Tag, Sparkles, Truck } from 'lucide-react';

const HeroSlider = ({ setCurrentPage }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            title: 'Хуш омадед ба ShopTJ!',
            description: 'Маҳсулоти боифат бо нархҳои муносиб',
            gradient: 'from-purple-600 to-blue-600',
            buttonText: 'Харид кунед',
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop',
            icon: <ShoppingBag className="w-32 h-32" />
        },
        {
            title: 'Тахфифҳои калон!',
            description: 'То 50% тахфиф барои маҳсулоти мунтахаб',
            gradient: 'from-pink-600 to-red-600',
            buttonText: 'Тахфифҳоро бинед',
            image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=600&fit=crop',
            icon: <Tag className="w-32 h-32" />
        },
        {
            title: 'Маҳсулоти нав!',
            description: 'Коллексияи навтарин маҳсулот дар мағозаи мо',
            gradient: 'from-green-600 to-teal-600',
            buttonText: 'Ҷустуҷӯ кунед',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
            icon: <Sparkles className="w-32 h-32" />
        },
        {
            title: 'Ирсоли ройгон!',
            description: 'Барои фармоишҳои зиёда аз 200 сомонӣ',
            gradient: 'from-orange-600 to-yellow-600',
            buttonText: 'Ҳоло фармоиш диҳед',
            image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=600&h=600&fit=crop',
            icon: <Truck className="w-32 h-32" />
        }
    ];

    // Автоматӣ гузариш ҳар 3 сония
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000);

        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="relative overflow-hidden rounded-3xl mb-12">
            {/* Слайдҳо */}
            <div className="relative h-80 md:h-96">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                            index === currentSlide
                                ? 'opacity-100 translate-x-0'
                                : index < currentSlide
                                    ? 'opacity-0 -translate-x-full'
                                    : 'opacity-0 translate-x-full'
                        }`}
                    >
                        <div className={`bg-gradient-to-r ${slide.gradient} h-full p-8 md:p-12 text-white`}>
                            <div className="h-full flex items-center justify-between gap-4 md:gap-6">
                                {/* Матн (тарафи чап) */}
                                <div className="max-w-xl flex-1">
                                    <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in">
                                        {slide.title}
                                    </h1>
                                    <p className="text-base md:text-xl mb-6 animate-fade-in-delay">
                                        {slide.description}
                                    </p>
                                    <button
                                        onClick={() => setCurrentPage('products')}
                                        className="bg-white text-gray-800 px-6 md:px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition animate-fade-in-delay-2"
                                    >
                                        {slide.buttonText}
                                    </button>
                                </div>

                                <div className="hidden md:flex items-center justify-center flex-shrink-0">
                                    <div className="relative w-60 h-60 lg:w-72 lg:h-72 rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
                                        <img
                                            src={slide.image}
                                            alt={slide.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                // Агар расм бор нашавад, иконка нишон диҳед
                                                e.target.style.display = 'none';
                                                e.target.nextElementSibling.style.display = 'flex';
                                            }}
                                        />
                                        <div className="hidden absolute inset-0 items-center justify-center bg-white/10 backdrop-blur-sm">
                                            {slide.icon}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>





            {/* Индикаторҳо (нуқтаҳо) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2 rounded-full transition-all ${
                            index === currentSlide
                                ? 'w-8 bg-white'
                                : 'w-2 bg-white/50 hover:bg-white/75'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;