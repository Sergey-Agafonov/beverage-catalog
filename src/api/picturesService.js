import { API_BASE_URL } from "./config";

/**
 * Upload a picture for a specific drink.
 * @param {number} drinkId - The ID of the drink.
 * @param {File} file - The picture file to upload.
 * @returns {Promise<Object>} - The uploaded picture data.
 */
export async function addDrinkPicture(drinkId, file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/drinks/${drinkId}/pictures`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok)
    throw new Error(`Failed to add picture: ${response.statusText}`);

  return response.json();
}

/**
 * Get all pictures for a specific drink.
 * @param {number} drinkId - The ID of the drink.
 * @returns {Promise<Array>} - An array of picture data.
 */
export async function getDrinkPictures(drinkId) {
  const response = await fetch(`${API_BASE_URL}/drinks/${drinkId}/pictures`);

  if (!response.ok)
    throw new Error(`Failed to fetch pictures: ${response.statusText}`);

  return response.json();
}
