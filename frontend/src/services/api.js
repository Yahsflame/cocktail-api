const API_BASE_URL = "http://localhost:3000";

export const searchDrinks = async (searchQuery, page, limit) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/search?query=${encodeURIComponent(
        searchQuery
      )}&index=${page}&limit=${limit}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
};

export const getDrinkDetail = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/detail?id=${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Detail error:", error);
    throw error;
  }
};
