// // src/context/CartContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';
//
// const CartContext = createContext();
//
// export const useCart = () => {
//     const context = useContext(CartContext);
//     if (!context) {
//         throw new Error('useCart бояд дар CartProvider истифода шавад');
//     }
//     return context;
// };
//
// export const CartProvider = ({ children }) => {
//     const [cart, setCart] = useState([]);
//     const [error, setError] = useState('');
//
//     // Load cart from localStorage
//     useEffect(() => {
//         const savedCart = localStorage.getItem('cart');
//         if (savedCart) {
//             try {
//                 setCart(JSON.parse(savedCart));
//             } catch (err) {
//                 console.error('Хатогӣ дар хондани cart:', err);
//             }
//         }
//     }, []);
//
//     // Save cart to localStorage
//     useEffect(() => {
//         if (cart.length > 0) {
//             localStorage.setItem('cart', JSON.stringify(cart));
//         }
//     }, [cart]);
//
//     const addToCart = async (product, quantity = 1) => {
//         setError('');
//
//         try {
//             // Санҷиши stock
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cart/check-stock', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     productId: product._id,
//                     quantity: quantity
//                 })
//             });
//
//             const data = await response.json();
//
//             if (!data.success) {
//                 setError(data.message);
//                 alert(data.message);
//                 return { success: false, message: data.message };
//             }
//
//             // Санҷед ки маҳсулот дар cart ҳаст
//             const existingItem = cart.find(item => item._id === product._id);
//
//             if (existingItem) {
//                 const newQuantity = existingItem.quantity + quantity;
//
//                 if (newQuantity > data.availableStock) {
//                     const message = `Фақат ${data.availableStock} дона дастрас аст`;
//                     setError(message);
//                     alert(message);
//                     return { success: false, message };
//                 }
//
//                 setCart(cart.map(item =>
//                     item._id === product._id
//                         ? { ...item, quantity: newQuantity }
//                         : item
//                 ));
//             } else {
//                 setCart([...cart, { ...product, quantity }]);
//             }
//
//             return { success: true, message: 'Ба cart илова шуд' };
//
//         } catch (error) {
//             console.error('Хатогӣ:', error);
//             const message = 'Хатогӣ дар илова кардан';
//             setError(message);
//             return { success: false, message };
//         }
//     };
//
//     const updateQuantity = async (id, quantity) => {
//         if (quantity < 1) {
//             removeFromCart(id);
//             return;
//         }
//
//         setError('');
//
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cart/check-stock', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     productId: id,
//                     quantity: quantity
//                 })
//             });
//
//             const data = await response.json();
//
//             if (!data.success) {
//                 setError(data.message);
//                 alert(data.message);
//                 return;
//             }
//
//             setCart(cart.map(item =>
//                 item._id === id ? { ...item, quantity } : item
//             ));
//
//         } catch (error) {
//             console.error('Хатогӣ:', error);
//         }
//     };
//
//     const removeFromCart = (id) => {
//         setCart(cart.filter(item => item._id !== id));
//         setError('');
//     };
//
//     const clearCart = () => {
//         setCart([]);
//         localStorage.removeItem('cart');
//         setError('');
//     };
//
//     const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//
//     return (
//         <CartContext.Provider value={{
//             cart,
//             error,
//             setError,
//             addToCart,
//             removeFromCart,
//             updateQuantity,
//             clearCart,
//             total
//         }}>
//             {children}
//         </CartContext.Provider>
//     );
// };



// src/context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart бояд дар CartProvider истифода шавад');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [error, setError] = useState('');

    // Load cart from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (err) {
                console.error('Хатогӣ дар хондани cart:', err);
            }
        }
    }, []);

    // Save cart to localStorage
    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            localStorage.removeItem('cart');
        }
    }, [cart]);

    const addToCart = async (product, quantity = 1) => {
        setError('');

        try {
            // Санҷиши stock
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cart/check-stock`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: product._id,
                    quantity: quantity
                })
            });

            const data = await response.json();

            if (!data.success) {
                setError(data.message);
                alert(data.message);
                return { success: false, message: data.message };
            }

            // Санҷед ки маҳсулот дар cart ҳаст
            const existingItem = cart.find(item => item._id === product._id);

            if (existingItem) {
                const newQuantity = existingItem.quantity + quantity;

                if (newQuantity > data.availableStock) {
                    const message = `Фақат ${data.availableStock} дона дастрас аст`;
                    setError(message);
                    alert(message);
                    return { success: false, message };
                }

                setCart(cart.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: newQuantity }
                        : item
                ));
            } else {
                setCart([...cart, { ...product, quantity }]);
            }

            return { success: true, message: 'Ба cart илова шуд' };

        } catch (error) {
            console.error('Хатогӣ:', error);
            const message = 'Хатогӣ дар илова кардан';
            setError(message);
            return { success: false, message };
        }
    };

    const updateQuantity = async (id, quantity) => {
        if (quantity < 1) {
            removeFromCart(id);
            return;
        }

        setError('');

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cart/check-stock`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: id,
                    quantity: quantity
                })
            });

            const data = await response.json();

            if (!data.success) {
                setError(data.message);
                alert(data.message);
                return;
            }

            setCart(cart.map(item =>
                item._id === id ? { ...item, quantity } : item
            ));

        } catch (error) {
            console.error('Хатогӣ:', error);
        }
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item._id !== id));
        setError('');
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
        setError('');
    };

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // ФУНКСИЯИ НАВ: Миқдори намудҳои маҳсулот (на миқдори донаҳо)
    const getItemCount = () => {
        return cart.length; // Миқдори намудҳои маҳсулот
    };

    // Агар ҳарду лозим бошад:
    const getTotalQuantity = () => {
        return cart.reduce((sum, item) => sum + item.quantity, 0); // Миқдори умумии донаҳо
    };

    return (
        <CartContext.Provider value={{
            cart,
            error,
            setError,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            total,
            getItemCount,      // ИЛОВА: миқдори намудҳо (2)
            getTotalQuantity   // ИЛОВА: миқдори донаҳо (13)
        }}>
            {children}
        </CartContext.Provider>
    );
};