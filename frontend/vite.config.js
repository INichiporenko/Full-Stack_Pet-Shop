// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";

// export default defineConfig({
//   plugins: [react()],
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  define: {
    // ВАЖНО: Это просто инструкция для сборщика заменить одну строку на другую
    "http://localhost:3333": JSON.stringify(""),
  },
});
