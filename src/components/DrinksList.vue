<template>
  <div>
    <h2>List of Drinks</h2>

    <div v-if="store.loading" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <p
      v-else-if="store.error"
      class="alert alert-danger alert-dismissible fade show"
    >
      {{ store.error }}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        @click="store.error = null"
      ></button>
    </p>
    <p v-else-if="store.drinks.length === 0" class="alert alert-info">
      No drinks available
    </p>

    <div v-else>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col" class="text-end">Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="drink in store.drinks"
            :key="drink.id"
            tabindex="0"
            role="button"
            :aria-label="`View details for ${drink.name}`"
            @click="$router.push(`/drink/${drink.id}`)"
          >
            <td>{{ drink.name }}</td>
            <td class="text-end">{{ formatDate(drink.createdAt) }}</td>
          </tr>
        </tbody>
      </table>

      <UseOffsetPagination
        v-slot="{ currentPage, next, prev, pageCount, isFirstPage, isLastPage }"
        :total="store.total"
        :page-size="PAGE_SIZE"
        :page="store.page"
        @page-change="handlePageChange"
      >
        <div class="d-flex justify-content-between align-items-center mt-3">
          <nav role="navigation" aria-label="pagination for drinks">
            <ul class="pagination mb-0">
              <li :class="{ 'page-item': true, disabled: isFirstPage }">
                <a
                  class="page-link"
                  href="#"
                  @click.prevent="!isFirstPage && prev()"
                >
                  Previous
                </a>
              </li>
              <li :class="{ 'page-item': true, disabled: isLastPage }">
                <a
                  class="page-link"
                  href="#"
                  @click.prevent="!isLastPage && next()"
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
          <span>{{ `page ${currentPage} of ${pageCount}` }}</span>
        </div>
      </UseOffsetPagination>
    </div>
  </div>
</template>

<script setup>
import { UseOffsetPagination } from "@vueuse/components";
import { onMounted } from "vue";
import { PAGE_SIZE, useDrinksStore } from "../stores/drinksStore";
import { formatDate } from "../utils/date";

const store = useDrinksStore();

onMounted(async () => {
  try {
    await store.loadDrinks();
  } catch (err) {
    console.error("Failed to fetch drinks:", err);
  }
});

const handlePageChange = ({ currentPage }) => {
  store.error = null;
  store.loadDrinks(currentPage);
};
</script>
