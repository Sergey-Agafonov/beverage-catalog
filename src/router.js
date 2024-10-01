import { createRouter, createWebHistory } from "vue-router";
import Drink from "./views/DrinkView.vue";
import Home from "./views/HomeView.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/drink/:id",
    component: Drink,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
