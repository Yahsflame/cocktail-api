import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="justify-self-center">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center border border-white rounded-lg focus-within:ring-2 focus-within:ring-primary max-h-10 overflow-hidden">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 ml-2" />
          <input
            type="text"
            value={query}
            onChange={handleSearchChange}
            placeholder="Search all drinks"
            className="flex-1 p-2 bg-transparent focus:outline-none border-r-white border-r-[1px] text-sm text-white"
          />
          <button
            type="submit"
            className="p-2.5 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 hover:bg-white hover:text-black"
          >
            <p className="uppercase text-sm">Go</p>
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
