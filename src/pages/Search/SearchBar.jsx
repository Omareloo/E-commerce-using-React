// /src/components/Navbar/SearchBar.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { IconButton, Tooltip } from '@mui/material';

 export default function SearchBar({ navbarRef }) {
    const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const inputRef = useRef(null); // Ref لحقل الإدخال

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/?keyword=${encodeURIComponent(searchQuery.trim())}`);
        }
        // إخفاء شريط البحث بعد البحث
        setShowSearch(false);
        setSearchQuery("");
    };

    // منطق الإغلاق عند النقر خارج الـ Navbar
    useEffect(() => {
        const handleClickOutside = (event) => {
            // التحقق من أن النقر ليس داخل الـ Navbar بالكامل
            if (showSearch && navbarRef.current && !navbarRef.current.contains(event.target)) {
                setShowSearch(false);
            }
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showSearch, navbarRef]); // navbarRef يجب أن يكون في array الاعتماديات

     useEffect(() => {
        if (showSearch && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showSearch]);

    return (
        <>
             <Tooltip title="Search">
                <IconButton
                    onClick={() => setShowSearch(!showSearch)}
                    sx={{ color: '#09c' }}
                >
                    <FaSearch />
                </IconButton>
            </Tooltip>

             {showSearch && (
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        ref={inputRef} 
                    />
                </form>
            )}
        </>
    );
}