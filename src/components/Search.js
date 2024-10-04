import React from 'react';

const Search = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className='searchInput_wrap'>
        <img src="./logo192.png" alt="" />
        <input
        className='searchInput'
        type="text"
        placeholder="이름으로 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
        </div>
    );
};

export default Search;
