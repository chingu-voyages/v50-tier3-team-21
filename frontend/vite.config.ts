import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import * as process from "process";
import dotenv from "dotenv"

dotenv.config()
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
