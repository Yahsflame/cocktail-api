import React, { useEffect, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearch } from "../../contexts/SearchContext";
import backgroundImage from "../../assets/images/background_img.png";
import Header from "../Header/Header";

function DrinkDetail() {
  const [drink, setDrink] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { handleSearch } = useSearch();

  const handleDetailSearch = (searchQuery) => {
    navigate("/?query=" + encodeURIComponent(searchQuery) + "&page=0");
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const drinkId = params.get("id");

    if (!drinkId) {
      setError("Drink ID is missing from the URL.");
      setIsLoading(false);
      return;
    }

    const fetchDrinkDetails = async () => {
      try {
        const response = await fetch(`/api/drinks/${drinkId}`);
        if (!response.ok) {
          throw new Error("Failed to load drink details");
        }
        const data = await response.json();
        setDrink(data);
      } catch (error) {
        console.error("Error fetching drink details:", error);
        setError("Unable to fetch drink details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDrinkDetails();
  }, [location.search]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-primary hover:text-blue-700"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Return to Home
        </button>
      </div>
    );
  }

  if (!drink) {
    return null;
  }

  return (
    <div
      className="bg-cover bg-center h-screen min-h-[calc(100vh)] max-h-[calc(100vh-144px)] md:max-h-[calc(100vh-70px)] overflow-scroll"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Header handleSearch={handleDetailSearch} />
      <div className="flex justify-center items-center">
        <div className="bg-transparent rounded-lg shadow-lg p-6 max-w-[628px]">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-white mb-6 hover:text-gray-400"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to results
          </button>

          <h2 className="text-4xl font-bold mb-4 text-white">{drink.name}</h2>

          <div className="grid md:grid-cols-2">
            <div>
              {drink.image && (
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="w-full rounded-lg shadow-md max-w-[220px]"
                />
              )}
              <div className="pt-4 text-white mb-[43px]">
                <p
                  className="uppercase text-[11px] max-w-fit px-2 pt-[7px] pb-[6px] rounded"
                  style={{ border: "1px solid rgba(255, 255, 255, 0.6)" }}
                >
                  {drink.category}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-white/70">
                {`${drink.ingredients.length} Ingredients`}
              </h3>

              <ul className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
                {drink.ingredients &&
                  drink.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-white">
                      <p className="text-white">{`${ingredient.measurement} ${ingredient.name}`}</p>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white/70">
            Instructions
          </h3>
          <p className="text-white mb-6">Serve: {drink.instructions}</p>

          <h3 className="text-xl font-semibold my-2 text-white/70">
            Glass Needed
          </h3>
          <p className="text-white mb-6">Serve: {drink.container}</p>
        </div>
      </div>
    </div>
  );
}

export default DrinkDetail;
