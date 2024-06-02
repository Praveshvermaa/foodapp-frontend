import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex items-center justify-center mt-8">
      <input
        type="text"
        placeholder="Enter your search term..."
        value={searchTerm}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-l focus:outline-none focus:border-blue-500"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
