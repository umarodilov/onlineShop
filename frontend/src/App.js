import React, { useState } from 'react';

// Pages
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import ProductsPage from './pages/ProductsPage';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

// Context
import { AuthProvider } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';
import { CartProvider } from './context/CartContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
      <AuthProvider>
        <CartProvider>
          <SearchProvider>
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
              <Header setCurrentPage={setCurrentPage} setSelectedProduct={setSelectedProduct} />

              {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} setSelectedProduct={setSelectedProduct} />}
              {currentPage === 'products' && <ProductsPage setSelectedProduct={setSelectedProduct} setCurrentPage={setCurrentPage} />}
              {currentPage === 'product-detail' && <ProductDetail product={selectedProduct} setCurrentPage={setCurrentPage} />}
              {currentPage === 'cart' && <CartPage setCurrentPage={setCurrentPage} />}
              {currentPage === 'checkout' && <CheckoutPage setCurrentPage={setCurrentPage} />}
              {currentPage === 'auth' && <AuthPage setCurrentPage={setCurrentPage} />}
              {currentPage === 'profile' && <ProfilePage setCurrentPage={setCurrentPage} />}
              {currentPage === 'about' && <AboutPage setCurrentPage={setCurrentPage} />}
              {currentPage === 'contact' && <ContactPage />}
              {currentPage === 'faq' && <FAQPage />}

              <Footer setCurrentPage={setCurrentPage} />
            </div>
          </SearchProvider>
        </CartProvider>
      </AuthProvider>
  );
}

