// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [token]);

    const fetchUser = async () => {
        try {
            const res = await fetch('/api/auth/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setUser(data.user);
                console.log('✅ Корбар гирифта шуд:', data.user);
            } else {
                console.log('❌ Токен нодуруст');
                setToken(null);
                setUser(null);
                localStorage.removeItem('token');
            }
        } catch (err) {
            console.error('❌ Хато дар гирифтани корбар:', err);
            setToken(null);
            setUser(null);
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            console.log('📨 Ҷавоби login:', data);

            if (data.success && data.token) {
                setToken(data.token);
                setUser(data.user);
                localStorage.setItem('token', data.token);
                console.log('✅ Login муваффақ:', data.user);
                return data;
            } else {
                console.log('❌ Login нотамом:', data.message);
                return data;
            }
        } catch (error) {
            console.error('❌ Хато дар login:', error);
            return { success: false, message: error.message };
        }
    };

    const register = async (userData) => {
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            const data = await res.json();

            console.log('📨 Ҷавоби register:', data);

            if (data.success && data.token) {
                setToken(data.token);
                setUser(data.user);
                localStorage.setItem('token', data.token);
                console.log('✅ Register муваффақ:', data.user);
                return data;
            } else {
                console.log('❌ Register нотамом:', data.message);
                return data;
            }
        } catch (error) {
            console.error('❌ Хато дар register:', error);
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        console.log('👋 Logout...');
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth бояд дар дохили AuthProvider истифода шавад');
    }
    return context;
};