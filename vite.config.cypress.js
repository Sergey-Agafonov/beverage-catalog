import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import commonConfig from "./common.config";

const API_URI = `${commonConfig.hosts.api}:${commonConfig.ports.api_e2e}`;

export default defineConfig({
  plugins: [vue()],
  server: {
    port: commonConfig.ports.ui_e2e,
    proxy: {
      "/api": {
        target: API_URI,
        changeOrigin: true,
      },
      "/files": {
        target: API_URI,
        changeOrigin: true,
      },
    },
  },
});
