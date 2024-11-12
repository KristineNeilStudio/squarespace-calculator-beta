import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Match with tsconfig "outDir"
    sourcemap: true, // Optional: adds sourcemaps, helpful for debugging
  },
});
