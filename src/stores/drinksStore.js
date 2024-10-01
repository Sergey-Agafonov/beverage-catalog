import { defineStore } from "pinia";
import { addDrink, getDrink, getDrinks } from "../api/drinksService";

export const PAGE_SIZE = 10;

export const useDrinksStore = defineStore("drinks", {
  state: () => ({
    drinks: [],
    loading: false,
    error: null,
    selectedDrink: null,
    total: 0,
    page: 1,
    search: {
      name: "",
      description: "",
      minRating: 0,
    },
  }),
  actions: {
    async loadDrinks(page = 1) {
      this.loading = true;
      try {
        const { items, total } = await getDrinks({
          offset: (page - 1) * PAGE_SIZE,
          length: PAGE_SIZE,
          sort: "createdAt",
          desc: true,
          ...this.search,
        });
        this.drinks = items;
        this.total = total;
        this.page = page;
      } catch (error) {
        throw (this.error = error.message);
      } finally {
        this.loading = false;
      }
    },

    async loadDrink(id) {
      this.loading = true;
      try {
        return (this.selectedDrink = await getDrink(id));
      } catch (error) {
        throw (this.error = error.message);
      } finally {
        this.loading = false;
      }
    },

    async createDrink(newDrink) {
      this.loading = true;
      this.error = null;
      try {
        const addedDrink = await addDrink(newDrink);
        await this.loadDrinks();
        return addedDrink;
      } catch (error) {
        throw (this.error = error.message);
      } finally {
        this.loading = false;
      }
    },
  },
});
