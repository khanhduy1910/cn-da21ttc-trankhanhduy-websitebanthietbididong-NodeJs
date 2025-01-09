import React, { useState } from 'react';
import './Search.css';

const Search = ({ history }) => {
    const [keyword, setKeyword] = useState('');

    const searchHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) {
            history.push(`/search/${keyword}`);
        } else {
            history.push('/');
        }
    };

    return (
        <form onSubmit={searchHandler} className="search-container">
            <input
                type="text"
                id="search_field"
                className="search-input"
                placeholder="Nhập tên sản phẩm cần tìm..."
                onChange={(e) => setKeyword(e.target.value)}
            />
            <button id="search_btn" className="search-button">
                <i className="fa fa-search" aria-hidden="true"></i>
            </button>
        </form>
    );
};

export default Search;
