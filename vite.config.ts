// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
import vue from "@vitejs/plugin-vue";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  root: "./dev",
  plugins: [
    vue(),
    cssInjectedByJsPlugin({
      jsAssetsFilterFunction: ({ fileName }) => fileName == "index.es.js" || fileName == "index.cjs.js",
    }),
  ],
  build: {
    lib: {
      entry: {
        main: resolve(__dirname, "src/index.ts"),
        themes: resolve(__dirname, "src/themes/index.ts"),
      },
      fileName: (format, entryName) => {
        if (entryName === "themes") {
          return `themes/index.${format}.js`;
        }

        return `index.${format}.js`;
      },
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        dir: resolve(__dirname, "dist"),
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
