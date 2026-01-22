import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MobileMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="relative md:hidden">
            {/* КНОПКА */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
            >
                {isMenuOpen ? <X /> : <Menu />}
            </button>

            {/* MENU */}
            {isMenuOpen && (
                <div className="absolute right-0 top-12 w-64 bg-white shadow-lg rounded-xl p-4 z-50">
                    <nav className="flex flex-col gap-3 text-gray-800">
                        <Link to="/" onClick={() => setIsMenuOpen(false)}>Асосӣ</Link>
                        <Link to="/products" onClick={() => setIsMenuOpen(false)}>Маҳсулот</Link>
                        <Link to="/about" onClick={() => setIsMenuOpen(false)}>Дар бораи мо</Link>
                        <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Тамос</Link>

                        <hr />

                        <Link to="/info" onClick={() => setIsMenuOpen(false)}>Маълумот</Link>
                        <Link to="/faq" onClick={() => setIsMenuOpen(false)}>Савол-Ҷавоб</Link>
                        <Link to="/terms" onClick={() => setIsMenuOpen(false)}>Шартҳо</Link>
                        <Link to="/privacy" onClick={() => setIsMenuOpen(false)}>Махфият</Link>
                    </nav>
                </div>
            )}
        </div>
    );
}
