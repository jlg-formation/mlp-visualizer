import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => {
  console.log("command: ", command);
  const base = command === "build" ? "/mlp-visualizer/" : "/";
  console.log("base: ", base);
  return {
    base,
    plugins: [react(), tailwindcss()],
  };
});
