// src/context/SearchContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const SearchContext = createContext();
export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch бояд дар дохили SearchProvider истифода шавад');
    }
    return context;
};

export const SearchProvider = ({ children }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (searchQuery.trim().length < 2) {
            setSearchResults([]);
            setLoading(false);
            return;
        }

        const controller = new AbortController();
        setLoading(true);

        const timeoutId = setTimeout(async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/products/search?q=${encodeURIComponent(searchQuery)}`,
                    { signal: controller.signal }
                );

                const data = await response.json();

                if (data.success) {
                    setSearchResults(data.data || []);
                } else {
                    setSearchResults([]);
                }
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Хатогӣ дар ҷустуҷӯ:', error);
                }
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => {
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, [searchQuery]);

    return (
        <SearchContext.Provider
            value={{
                isSearchOpen,
                setIsSearchOpen,
                searchQuery,
                setSearchQuery,
                searchResults,
                loading,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};
