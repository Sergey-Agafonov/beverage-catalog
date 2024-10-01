import { defineStore } from "pinia";
import { addDrinkPicture, getDrinkPictures } from "../api/picturesService";
import { useDrinksStore } from "./drinksStore";

export const usePictureStore = defineStore("picture", {
  state: () => ({
    pictures: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchPictures(drinkId) {
      this.loading = true;
      this.error = null;
      try {
        this.pictures = await getDrinkPictures(drinkId);
      } catch (error) {
        throw (this.error = error.message);
      } finally {
        this.loading = false;
      }
    },

    async uploadPicture(drinkId, file) {
      this.loading = true;
      this.error = null;
      try {
        await addDrinkPicture(drinkId, file);
        this.pictures = (await useDrinksStore().loadDrink(drinkId)).Pictures;
      } catch (error) {
        throw (this.error = error.message);
      } finally {
        this.loading = false;
      }
    },
  },
});
