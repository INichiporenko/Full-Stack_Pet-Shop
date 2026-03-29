import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  define: {
    '"http://localhost:3333"': JSON.stringify(
      process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3333",
    ),
  },
});
