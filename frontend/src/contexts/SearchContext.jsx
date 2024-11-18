import React, { createContext, useContext } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (searchQuery) => {
    if (location.pathname !== "/") {
      navigate(`/?query=${encodeURIComponent(searchQuery)}&page=0`);
    } else {
      setSearchParams({ query: searchQuery, page: "0" });
    }
  };

  const handlePagination = (page) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    setSearchParams(newParams);
  };

  return (
    <SearchContext.Provider
      value={{
        searchParams,
        handleSearch,
        handlePagination,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
