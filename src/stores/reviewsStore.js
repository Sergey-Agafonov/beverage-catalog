import { defineStore } from "pinia";
import { addDrinkReview } from "../api/reviewsService";
import { useDrinksStore } from "./drinksStore";

export const useReviewsStore = defineStore("reviews", {
  state: () => ({
    reviews: [],
    loading: false,
    error: null,
  }),

  actions: {
    async createReview(drinkId, newReview) {
      this.loading = true;
      this.error = null;
      try {
        await addDrinkReview(drinkId, newReview);
        await useDrinksStore().loadDrink(drinkId); // Refresh the drink data to update the average rating
      } catch (error) {
        throw (this.error = error.message);
      } finally {
        this.loading = false;
      }
    },
  },
});
