// src/components/Header.js
import React, { useState } from 'react';
import { Search, ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import SearchModal from './SearchModal';

const Header = ({ setCurrentPage, setSelectedProduct }) => {
    const { setIsSearchOpen } = useSearch();
    const { user, logout } = useAuth();
    const { cart, getItemCount } = useCart();
    const itemCount = getItemCount();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            <header className="bg-white shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-8">
                            <h1
                                onClick={() => setCurrentPage('home')}
                                className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent cursor-pointer"
                            >
                                🛍️ ShopTJ
                            </h1>
                            <nav className="hidden md:flex space-x-6">
                                <button onClick={() => setCurrentPage('home')} className="text-gray-700 hover:text-purple-600 font-medium">Асосӣ</button>
                                <button onClick={() => setCurrentPage('products')} className="text-gray-700 hover:text-purple-600 font-medium">Маҳсулот</button>
                                <button onClick={() => setCurrentPage('about')} className="text-gray-700 hover:text-purple-600 font-medium">Дар бораи мо</button>
                                <button onClick={() => setCurrentPage('contact')} className="text-gray-700 hover:text-purple-600 font-medium">Тамос</button>
                            </nav>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    setIsSearchOpen(true);
                                }}
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                                <Search className="w-5 h-5" />
                            </button>

                            <button
                                className="p-2 hover:bg-gray-100 rounded-full relative"
                                onClick={() => setCurrentPage('cart')}
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {itemCount}
                                    </span>
                                )}
                            </button>

                            {user ? (
                                <div className="relative group">
                                    <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                                        <User className="w-5 h-5" />
                                        <span className="hidden md:block">{user.name}</span>
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 hidden group-hover:block">
                                        <button onClick={() => setCurrentPage('profile')} className="w-full px-4 py-2 text-left hover:bg-gray-100">Профил</button>
                                        <button onClick={logout} className="w-full px-4 py-2 text-left hover:bg-gray-100 text-red-600 flex items-center gap-2">
                                            <LogOut className="w-4 h-4" /> Баромадан
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setCurrentPage("auth")}
                                    className="bg-purple-600 text-white w-10 h-10 sm:w-auto sm:h-auto
             sm:px-5 sm:py-2.5 rounded-full sm:rounded-xl
             hover:bg-purple-700 active:scale-95 transition
             flex items-center justify-center gap-2"
                                    aria-label="Воридшавӣ"
                                >
                                    <User className="w-5 h-5" />
                                    <span className="hidden sm:inline">Воридшавӣ</span>
                                </button>
                                // <button onClick={() => setCurrentPage('auth')} className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
                                //     Воридшавӣ
                                // </button>
                            )}

                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
                                {isMenuOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden absolute top-full right-4 mt-2 w-60 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 z-50">
                        <div className="flex flex-col px-5 py-4 text-[15px] font-medium text-gray-800">
                            {[
                                { label: 'Асосӣ', page: 'home' },
                                { label: 'Маҳсулот', page: 'products' },
                                { label: 'Дар бораи мо', page: 'about' },
                                { label: 'Тамос', page: 'contact' },
                                { divider: true },
                                { label: 'Савол-Ҷавоб', page: 'faq' },
                            ].map((item, index) =>
                                item.divider ? (
                                    <div key={index} className="h-px bg-gray-200 my-3" />
                                ) : (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setCurrentPage(item.page);
                                            setIsMenuOpen(false);
                                        }}
                                        className="py-2.5 text-left rounded-lg transition-colors duration-150 hover:bg-gray-100 active:bg-purple-100 active:text-purple-700"
                                    >
                                        {item.label}
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                )}
            </header>

            <SearchModal setCurrentPage={setCurrentPage} setSelectedProduct={setSelectedProduct} />
        </>
    );
};

export default Header;