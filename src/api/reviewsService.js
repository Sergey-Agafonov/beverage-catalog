import { API_BASE_URL } from "./config";

/**
 * Add a review for a specific drink.
 * @param {number} drinkId - The ID of the drink.
 * @param {Object} review - The review data to add.
 * @returns {Promise<Object>} - The added review data.
 */
export async function addDrinkReview(drinkId, review) {
  const response = await fetch(`${API_BASE_URL}/drinks/${drinkId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

  if (!response.ok) {
    throw new Error(`Failed to add review: ${response.statusText}`);
  }

  return response.json();
}
