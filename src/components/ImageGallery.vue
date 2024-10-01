<template>
  <div v-if="images.length > 0" class="d-flex flex-wrap" style="gap: 10px">
    <img
      v-for="image in images"
      :key="image.id"
      class="img-thumbnail"
      style="height: 10rem"
      :src="`/${image.path}`"
      :alt="image.name"
      role="img"
      :aria-label="`Picture of ${image.name}`"
    />
  </div>
  <div v-else>
    <p>No pictures available</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useDrinksStore } from "../stores/drinksStore";

const images = computed(() => useDrinksStore().selectedDrink.Pictures);
</script>
