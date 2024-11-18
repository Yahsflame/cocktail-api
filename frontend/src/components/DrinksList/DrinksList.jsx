import React from "react";
import prevIcon from "../../assets/images/prev.svg";
import nextIcon from "../../assets/images/next.svg";

function DrinksList({
  drinks,
  onDrinkSelect,
  currentPage,
  totalCount,
  itemsPerPage,
  onPageChange,
  query,
}) {
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="max-w-[906px] m-auto">
      <h2 className="text-white text-4xl mb-[29px]">
        {query === "" ? "All Drinks" : `Search: ${query}`}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {drinks.map((drink) => (
          <div
            key={drink.id}
            onClick={() => onDrinkSelect(drink.id)}
            className="flex bg-transparent rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            style={{ border: "1px solid rgba(255, 255, 255, 0.6)" }}
          >
            <img
              src={drink.image}
              alt={drink.name}
              className="w-[137px] h-[137px] rounded-2xl p-3.5"
            />
            <div className="p-4 text-white">
              <h2 className="text-2xl mb-2">{drink.name}</h2>
              <p
                className="uppercase text-[11px] max-w-fit px-2 pt-[7px] pb-[6px] rounded"
                style={{ border: "1px solid rgba(255, 255, 255, 0.6)" }}
              >
                {drink.category}
              </p>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-flex-start mt-8 gap-2 text-white">
          <button
            data-testid="next-button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-4 py-2 rounded disabled:opacity-50"
            style={{ backgroundColor: "rgba(55, 55, 55, 0.8)" }}
          >
            <img src={prevIcon} alt="Previous" />
          </button>
          <span className="px-4 py-2">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            data-testid="prev-button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
            className="px-4 py-2 rounded disabled:opacity-50"
            style={{ backgroundColor: "rgba(55, 55, 55, 0.8)" }}
          >
            <img src={nextIcon} alt="Previous" />
          </button>
        </div>
      )}
    </div>
  );
}

export default DrinksList;
