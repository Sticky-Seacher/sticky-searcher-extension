import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: {
        background: "./background/background.js",
      },
      output: {
        entryFileNames: "assets/[name].js",
      },
    },
    sourcemap: true,
  },
});
