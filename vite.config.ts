import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/kameashi/" : "/",
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
});
