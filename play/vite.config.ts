import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
export default defineConfig({
  plugins: [vue()],
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.vue'],
});
