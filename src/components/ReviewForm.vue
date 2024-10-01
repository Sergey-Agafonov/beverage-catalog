<template>
  <div v-if="drink" data-testid="review-form">
    <div class="card">
      <div class="card-header">Post a review</div>
      <div class="card-body">
        <form @submit.prevent="submitReview">
          <div>
            <label for="user_name" class="visually-hidden">Your Name</label>
            <input
              id="user_name"
              v-model="review.user_name"
              type="text"
              class="form-control"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label class="visually-hidden" for="review_text">Description</label>
            <textarea
              id="review_text"
              v-model="review.description"
              class="form-control"
              placeholder="Enter your review"
              required
            ></textarea>
          </div>
          <div>
            <select
              id="rating"
              v-model="review.rating"
              class="form-select"
              required
            >
              <option disabled hidden value="">Select rating</option>
              <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary" :disabled="loading">
            Submit
          </button>
        </form>
      </div>
    </div>

    <div class="mt-3">
      <p v-if="error" class="alert alert-danger alert-dismissible fade show">
        {{ error }}
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          @click="reviewsStore.error = null"
        ></button>
      </p>
      <p
        v-if="success"
        class="alert alert-success alert-dismissible fade show"
        role="alert"
      >
        {{ success }}
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          @click="success = null"
        ></button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useDrinksStore } from "../stores/drinksStore";
import { useReviewsStore } from "../stores/reviewsStore";

const reviewsStore = useReviewsStore();

const success = ref(null);
const review = reactive({
  user_name: "",
  description: "",
  rating: "",
});

const drink = computed(() => useDrinksStore().selectedDrink);
const loading = computed(() => reviewsStore.loading);
const error = computed(() => reviewsStore.error);

const submitReview = async () => {
  success.value = null;
  reviewsStore.error = null;

  try {
    await reviewsStore.createReview(drink.value.id, review);
    success.value = "Review posted successfully!";
    review.user_name = "";
    review.description = "";
    review.rating = "";
  } catch (err) {
    console.error("Failed to add review:", err);
  }
};
</script>
