import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/wp-content/plugins/wp-vue-customBuyBackModule/',
  // assetsInclude: ['**/*.json'],
  // optimizeDeps:{
  //   exclude: ['phone-models.json']
  // },
  build: {
    rollupOptions: {
      // external: [
      //   './assets/mobile-expert/phone-models.json'
      // ]
    },
    // assetsInlineLimit: 0,
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

});
