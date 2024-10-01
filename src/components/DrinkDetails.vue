<template>
  <div v-if="drink" data-testid="drink-details">
    <h2 class="mb-4 text-primary">{{ drink.name }}</h2>

    <dl class="row">
      <dt class="col-auto">Description</dt>
      <dd class="col-auto">
        {{ drink.description }}
      </dd>
    </dl>
    <dl class="row">
      <dt class="col-auto">Created At</dt>
      <dd class="col-auto">
        {{ formatDate(drink.createdAt) }}
      </dd>
    </dl>
    <dl class="row">
      <dt class="col-auto">Updated At</dt>
      <dd class="col-auto">
        {{ formatDate(drink.updatedAt) }}
      </dd>
    </dl>
    <dl class="row">
      <dt class="col-auto">Reviews</dt>
      <dd class="col-auto">
        <span v-if="drink.reviewCount === 0">No reviews yet</span>
        <span v-else>
          {{ drink.reviewCount }} reviews with an average rating of
          {{ drink.reviewAverageRating.toFixed(1) }}
        </span>
      </dd>
    </dl>
    <PictureUpload />
    <ImageGallery />
  </div>
  <div v-else>
    <p v-if="error" class="alert alert-danger">
      {{ error }}
    </p>
    <div v-else-if="loading" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <p v-else class="alert alert-warning">Drink not found</p>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useDrinksStore } from "../stores/drinksStore";
import { formatDate } from "../utils/date";
import ImageGallery from "./ImageGallery.vue";
import PictureUpload from "./PictureUpload.vue";

const route = useRoute();
const store = useDrinksStore();

onMounted(async () => {
  try {
    await store.loadDrink(route.params.id);
  } catch (err) {
    console.error("Failed to fetch drink:", err);
  }
});

const drink = computed(() => store.selectedDrink);
const loading = computed(() => store.loading);
const error = computed(() => store.error);
</script>
