import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const info = localStorage.getItem('adminInfo');
        if (info) {
            setAdmin(JSON.parse(info));
        }
        setLoading(false);
    }, []);

    const login = (data) => {
        if (data.role !== 'admin') {
            throw new Error('Access denied. Admin only.');
        }
        localStorage.setItem('adminInfo', JSON.stringify(data));
        setAdmin(data);
    };

    const logout = () => {
        localStorage.removeItem('adminInfo');
        setAdmin(null);
    };

    return (
        <AuthContext.Provider value={{ admin, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
