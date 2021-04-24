const vue = require("@vitejs/plugin-vue").default;
const path = require("path");

module.exports = {
  root: "./dev",
  plugins: [vue()],
  resolve: {
    alias: {
      "/@src": path.resolve(__dirname, "src"),
    },
  },
};
