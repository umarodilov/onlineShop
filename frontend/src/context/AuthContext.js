import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// 👉 API URL (локал + продакшн)
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    // ================= CHECK USER =================
    useEffect(() => {
        if (token) {
            fetchUser();
        } else {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const fetchUser = async () => {
        try {
            const res = await fetch(`${API_URL}/api/auth/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setUser(data.user);
                console.log('✅ Корбар гирифта шуд:', data.user);
            } else {
                throw new Error('Token invalid');
            }
        } catch (err) {
            console.error('❌ Хато дар гирифтани корбар:', err.message);
            setUser(null);
            setToken(null);
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
    };

    // ================= LOGIN =================
    const login = async (email, password) => {
        try {
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            console.log('📨 Login response:', data);

            if (res.ok && data.success && data.token) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                setUser(data.user);
                return { success: true };
            }

            return {
                success: false,
                message: data.message || 'Login нодуруст'
            };
        } catch (error) {
            console.error('❌ Хато дар login:', error);
            return { success: false, message: error.message };
        }
    };

    // ================= REGISTER =================
    const register = async (userData) => {
        try {
            const res = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            const data = await res.json();
            console.log('📨 Register response:', data);

            if (res.ok && data.success && data.token) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                setUser(data.user);
                return { success: true };
            }

            return {
                success: false,
                message: data.message || 'Register нодуруст'
            };
        } catch (error) {
            console.error('❌ Хато дар register:', error);
            return { success: false, message: error.message };
        }
    };

    // ================= LOGOUT =================
    const logout = () => {
        console.log('👋 Logout');
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };

    // ================= UPDATE PROFILE =================
    const updateProfile = async (profileData) => {
        try {
            const res = await fetch(`${API_URL}/api/auth/update-profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(profileData)
            });

            const data = await res.json();
            console.log('📨 Update profile response:', data);

            if (res.ok && data.success) {
                setUser(data.user); // ✅ user-ро нав мекунем
                return { success: true, user: data.user };
            }

            return {
                success: false,
                message: data.message || 'Навсозии профил номуваффақ'
            };
        } catch (error) {
            console.error('❌ Хато дар updateProfile:', error);
            return { success: false, message: error.message };
        }
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                register,
                logout,
                updateProfile,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// ================= HOOK =================
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth бояд дар дохили AuthProvider истифода шавад');
    }
    return context;
};

// // src/context/AuthContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';
//
// const AuthContext = createContext();
//
// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [token, setToken] = useState(localStorage.getItem('token'));
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         if (token) {
//             fetchUser();
//         } else {
//             setLoading(false);
//         }
//     }, [token]);
//
//     const fetchUser = async () => {
//         try {
//             const res = await fetch('/api/auth/me', {
//                 headers: { 'Authorization': `Bearer ${token}` }
//             });
//             const data = await res.json();
//             if (data.success) {
//                 setUser(data.user);
//                 console.log('✅ Корбар гирифта шуд:', data.user);
//             } else {
//                 console.log('❌ Токен нодуруст');
//                 setToken(null);
//                 setUser(null);
//                 localStorage.removeItem('token');
//             }
//         } catch (err) {
//             console.error('❌ Хато дар гирифтани корбар:', err);
//             setToken(null);
//             setUser(null);
//             localStorage.removeItem('token');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const login = async (email, password) => {
//         try {
//             const res = await fetch('/api/auth/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email, password })
//             });
//             const data = await res.json();
//
//             console.log('📨 Ҷавоби login:', data);
//
//             if (data.success && data.token) {
//                 setToken(data.token);
//                 setUser(data.user);
//                 localStorage.setItem('token', data.token);
//                 console.log('✅ Login муваффақ:', data.user);
//                 return data;
//             } else {
//                 console.log('❌ Login нотамом:', data.message);
//                 return data;
//             }
//         } catch (error) {
//             console.error('❌ Хато дар login:', error);
//             return { success: false, message: error.message };
//         }
//     };
//
//     const register = async (userData) => {
//         try {
//             const res = await fetch('/api/auth/register', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(userData)
//             });
//             const data = await res.json();
//
//             console.log('📨 Ҷавоби register:', data);
//
//             if (data.success && data.token) {
//                 setToken(data.token);
//                 setUser(data.user);
//                 localStorage.setItem('token', data.token);
//                 console.log('✅ Register муваффақ:', data.user);
//                 return data;
//             } else {
//                 console.log('❌ Register нотамом:', data.message);
//                 return data;
//             }
//         } catch (error) {
//             console.error('❌ Хато дар register:', error);
//             return { success: false, message: error.message };
//         }
//     };
//
//     const logout = () => {
//         console.log('👋 Logout...');
//         setUser(null);
//         setToken(null);
//         localStorage.removeItem('token');
//     };
//
//     return (
//         <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
//
// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth бояд дар дохили AuthProvider истифода шавад');
//     }
//     return context;
// };