import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: {
        content: "./content-script/content.js",
      },
      output: {
        entryFileNames: "assets/[name].js",
      },
    },
    sourcemap: true,
  },
});
