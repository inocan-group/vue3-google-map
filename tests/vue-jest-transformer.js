/**
 * Thin wrapper around @vue/vue3-jest that ensures the source map is returned
 * as a parsed object instead of a JSON string. Istanbul (used by Jest for
 * coverage) expects an object; when it receives a string the coverage report
 * line numbers are wrong because Istanbul cannot remap them to the original
 * source positions.
 *
 * @vue/vue3-jest returns `map` as a string (see its lib/process.js, which ends
 * with `map: output.map.toString()`). This is the broken-coverage-line-numbers
 * symptom tracked upstream in https://github.com/vuejs/vue-jest/issues/514
 * (still open; the repo is effectively unmaintained, so do NOT remove this
 * wrapper expecting an upstream fix — verify against a real coverage run first).
 */
const vueJest = require("@vue/vue3-jest");

module.exports = {
  process(src, filename, config) {
    const result = vueJest.process(src, filename, config);

    if (result && typeof result.map === "string") {
      try {
        result.map = JSON.parse(result.map);
      } catch {
        // If parsing fails, drop the map so coverage falls back gracefully
        result.map = undefined;
      }
    }

    return result;
  },
};

