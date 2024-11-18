import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { useSearch } from "../../contexts/SearchContext";

const Header = () => {
  const { handleSearch } = useSearch();

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 items-center p-4"
      style={{ borderBottom: "0.5px solid rgba(255, 255, 255, 0.2)" }}
    >
      <h1 className="text-4xl font-bold text-left text-white mb-8 md:mb-0">
        <a href="/">BarCraft</a>
      </h1>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
};

export default Header;
