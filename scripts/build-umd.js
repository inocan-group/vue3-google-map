const { resolve } = require("path");
const { build } = require("vite");
const vue = require("@vitejs/plugin-vue").default;
const cssInjectedByJsPlugin = require("vite-plugin-css-injected-by-js").default;

(async () => {
  await build({
    configFile: false,
    plugins: [vue(), cssInjectedByJsPlugin()],
    build: {
      emptyOutDir: false,
      lib: {
        entry: resolve(__dirname, "../src/index.ts"),
        formats: ["umd"],
        name: "Vue3GoogleMap",
        fileName: "index",
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ["vue"],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            vue: "Vue",
          },
          dir: resolve(__dirname, "../dist"),
        },
      },
    },
  });
})();
