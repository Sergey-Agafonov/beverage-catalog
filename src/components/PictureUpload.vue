<template>
  <div v-if="drink" data-testid="file-upload">
    <form class="d-sm-flex" style="gap: 10px" @submit.prevent="uploadPicture">
      <div>
        <label for="fileInput" class="form-label">
          Choose an image to upload:
        </label>
        <input
          id="fileInput"
          ref="fileInput"
          type="file"
          class="form-control"
          accept="image/*"
          required
        />
      </div>
      <button
        type="submit"
        class="btn btn-primary align-self-end"
        :disabled="loading"
        aria-busy="loading"
      >
        Upload
      </button>
    </form>

    <div class="mt-3">
      <p v-if="error" class="alert alert-danger alert-dismissible fade show">
        {{ error }}
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          @click="pictureStore.error = null"
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
import { computed, ref } from "vue";
import { useDrinksStore } from "../stores/drinksStore";
import { usePictureStore } from "../stores/picturesStore";

const pictureStore = usePictureStore();

const success = ref(null);
const fileInput = ref(null);

const drink = computed(() => useDrinksStore().selectedDrink);
const loading = computed(() => pictureStore.loading);
const error = computed(() => pictureStore.error);

const uploadPicture = async () => {
  success.value = null;
  pictureStore.error = null;

  try {
    await pictureStore.uploadPicture(drink.value.id, fileInput.value.files[0]);
    success.value = "Picture uploaded successfully!";
    fileInput.value.value = null;
  } catch (err) {
    console.error("Failed to upload picture:", err);
  }
};
</script>
