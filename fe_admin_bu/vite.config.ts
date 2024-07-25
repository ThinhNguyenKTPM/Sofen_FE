import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react()],

  resolve: {
    extensions: [".tsx", ".ts", ".js"],

    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "app": `${path.resolve(__dirname, "./src/app/")}`,
      "components": `${path.resolve(__dirname, "./src/components/")}`,
      "public": `${path.resolve(__dirname, "./src/modules/public/")}`,
      "authentication": `${path.resolve(__dirname, "./src/modules/authentication/")}`,
    },
  },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  }
})
