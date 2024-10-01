import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";
import commonConfig from "./common.config.js";

export default defineConfig({
  e2e: {
    supportFile: false,
    setupNodeEvents(on) {
      on("file:preprocessor", vitePreprocessor());
    },
    baseUrl: `${commonConfig.hosts.ui}:${commonConfig.ports.ui_e2e}`,
  },
});
