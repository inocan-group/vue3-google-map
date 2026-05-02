import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { build } from "vite";
import vue from "@vitejs/plugin-vue";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

const __dirname = dirname(fileURLToPath(import.meta.url));

await build({
  configFile: false,
  plugins: [
    vue(),
    cssInjectedByJsPlugin({
      useStrictCSP: true,
    }),
  ],
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "../src/index.ts"),
      formats: ["umd"],
      name: "Vue3GoogleMap",
      fileName: "index",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
        dir: resolve(__dirname, "../dist"),
      },
    },
  },
});
