import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchDrinks } from "./services/api";
import DrinksList from "./components/DrinksList/DrinksList";
import Loader from "./components/Loader/Loader";
import backgroundImage from "./assets/images/background_img.png";
import Header from "./components/Header/Header";
import { useSearch } from "./contexts/SearchContext";

function App() {
  const [searchResults, setSearchResults] = useState({
    drinks: [],
    totalCount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const itemsPerPage = 10;

  const navigate = useNavigate();
  const { searchParams, handleSearch, handlePagination } = useSearch();
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page"), 10) || 0;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setProgress(0);

      let progressInterval = setInterval(() => {
        setProgress((prev) => {
          const nextValue = prev + 10;
          if (nextValue >= 90) {
            clearInterval(progressInterval);
          }
          return nextValue;
        });
      }, 100);

      try {
        const data = await searchDrinks(query, page, itemsPerPage);
        setSearchResults(data);
        setProgress(100);
      } catch (error) {
        setError("Search failed. Please try again.");
        setProgress(100);
      } finally {
        setIsLoading(false);
        clearInterval(progressInterval);
      }
    };

    fetchData();
  }, [query, page]);

  const handlePageChange = (newPage) => {
    if (
      newPage >= 0 &&
      newPage < Math.ceil(searchResults.totalCount / itemsPerPage)
    ) {
      handlePagination(newPage);
    }
  };

  const handleDrinkSelect = (id) => {
    navigate(`/detail?id=${id}`);
  };

  return (
    <div
      className="bg-cover bg-center h-screen min-h-[calc(100vh-144px)]"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Header handleSearch={handleSearch} />
      <div className="container mx-auto px-4 py-8 max-h-[calc(100vh-144px)] md:max-h-[calc(100vh-70px)] overflow-scroll">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col justify-center items-center my-8">
            <Loader progress={progress} />
            <p className="text-white text-xl mt-3">Searching...</p>
          </div>
        ) : (
          <>
            <DrinksList
              drinks={searchResults.drinks}
              onDrinkSelect={handleDrinkSelect}
              currentPage={page}
              totalCount={searchResults.totalCount}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              query={query}
            />
            {searchResults.drinks.length === 0 && !isLoading && (
              <div className="p-4 text-white">
                <h2 className="text-xl font-semibold mb-2">No drinks found</h2>
                <p>Please try another search</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
