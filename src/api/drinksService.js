import { API_BASE_URL } from "./config";

/**
 * Add a new drink.
 * @param {Object} drink - The drink object to add.
 * @returns {Promise<Object>} - The added drink data.
 */
export async function addDrink(drink) {
  const response = await fetch(`${API_BASE_URL}/drinks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(drink),
  });

  if (!response.ok) {
    throw new Error(`Failed to add drink: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get drinks with optional query parameters.
 * @param {Object} params - Query parameters for filtering and pagination.
 * @returns {Promise<Object>} - The list of drinks and pagination info.
 */
export async function getDrinks(params) {
  const queryParams = new URLSearchParams(params);
  const response = await fetch(
    `${API_BASE_URL}/drinks?${queryParams.toString()}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch drinks: ${response.statusText}`);
  }

  return response.json();
}

export async function getDrink(drinkId) {
  const response = await fetch(`${API_BASE_URL}/drinks/${drinkId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch drink: ${response.statusText}`);
  }

  return response.json();
}
