<template>
  <div data-testid="search-drink-form">
    <h2>Search a Drink</h2>
    <form @submit.prevent="searchDrinks">
      <div>
        <label for="search_name" class="form-label">
          by Name containing:
        </label>
        <input
          id="search_name"
          v-model="store.search.name"
          type="text"
          class="form-control"
          placeholder="enter text"
        />
      </div>
      <div>
        <label for="search_description" class="form-label">
          by Description containing:
        </label>
        <input
          id="search_description"
          v-model="store.search.description"
          type="text"
          class="form-control"
          placeholder="enter text"
        />
      </div>
      <div>
        <label for="minRating" class="form-label">With rating at least:</label>
        <select
          id="minRating"
          v-model="store.search.minRating"
          class="form-select"
        >
          <option disabled hidden value="0">Select min rating</option>
          <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary" :disabled="loading">
        Search
      </button>
      <button
        type="button"
        class="btn btn-secondary ms-sm-3"
        @click="resetForm"
      >
        Reset
      </button>
    </form>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useDrinksStore } from "../stores/drinksStore";

const store = useDrinksStore();
const loading = computed(() => store.loading);

const searchDrinks = async () => {
  store.error = null;

  try {
    await store.loadDrinks();
  } catch (err) {
    console.error("Failed to find drink:", err);
  }
};

const resetForm = () => {
  store.search = {
    name: "",
    description: "",
    minRating: 0,
  };
  searchDrinks();
};
</script>
