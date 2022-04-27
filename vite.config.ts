import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
            name: "VueQuickNotes",
            entry: path.resolve(__dirname, "src/index.ts"),
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                globals: {
                    vue: "Vue",
                },
            },
        },
    },
  plugins: [vue()]
})
