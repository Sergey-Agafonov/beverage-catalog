<template>
  <div data-testid="add-drink-form">
    <h2>Add a Drink</h2>
    <form @submit.prevent="submitDrink">
      <div>
        <label for="name" class="form-label">Name:</label>
        <input
          id="name"
          v-model="drink.name"
          type="text"
          class="form-control"
          placeholder="Enter drink name"
          required
          aria-required="true"
        />
      </div>
      <div>
        <label for="description" class="form-label">Description:</label>
        <textarea
          id="description"
          v-model="drink.description"
          class="form-control"
          placeholder="Enter description"
          required
          aria-required="true"
        ></textarea>
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="loading"
        aria-busy="loading"
      >
        Add
      </button>
    </form>

    <p v-if="error" class="alert alert-danger alert-dismissible fade show mt-3">
      {{ error }}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        @click="error = null"
      ></button>
    </p>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useDrinksStore } from "../stores/drinksStore";

const store = useDrinksStore();

const drink = ref({
  name: "",
  description: "",
});

const loading = computed(() => store.loading);
const error = ref(null);

const submitDrink = async () => {
  error.value = null;

  try {
    await store.createDrink(drink.value);
    drink.value = { name: "", description: "" };
  } catch (err) {
    error.value = `Failed to add drink: ${err}`;
  }
};
</script>
