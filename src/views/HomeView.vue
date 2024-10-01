<template>
  <div class="row justify-content-between">
    <div class="col-sm-auto">
      <DrinkForm />
    </div>
    <div class="col-sm-auto">
      <DrinkSearch />
    </div>
  </div>
  <div class="row mt-3">
    <div class="col">
      <hr />
      <DrinksList />
    </div>
  </div>
</template>
<script setup>
import DrinkForm from "../components/DrinkForm.vue";
import DrinkSearch from "../components/DrinkSearch.vue";
import DrinksList from "../components/DrinksList.vue";
</script>
