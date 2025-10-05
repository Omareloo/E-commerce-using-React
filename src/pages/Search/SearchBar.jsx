import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { IconButton, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';

 export default function SearchBar({ navbarRef }) {
    const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const inputRef = useRef(null);
    const {content} = useSelector((state) => state.lang);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/?keyword=${encodeURIComponent(searchQuery.trim())}`);
        }
        setShowSearch(false);
        setSearchQuery("");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showSearch && navbarRef.current && !navbarRef.current.contains(event.target)) {
                setShowSearch(false);
            }
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showSearch, navbarRef]);

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
                        placeholder= {content.SearchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        ref={inputRef} 
                    />
                </form>
            )}
        </>
    );
}