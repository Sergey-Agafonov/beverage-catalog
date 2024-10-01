import pluginJs from "@eslint/js";
import eslintPluginCypress from "eslint-plugin-cypress/flat";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";

export default [
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    languageOptions: {
      globals: globals.browser,
      ...globals["cypress/globals"],
    },
  },
  pluginJs.configs.recommended,
  eslintPluginCypress.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    rules: {
      "no-warning-comments": ["warn"],
      "vue/max-attributes-per-line": "off",
      "vue/html-self-closing": "off",
      "vue/singleline-html-element-content-newline": "off",
    },
  },
  {
    ignores: ["dist"],
  },
];
