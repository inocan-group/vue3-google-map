/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
const rollup = require("rollup");
const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
const resolve = require("@rollup/plugin-node-resolve").default;
const terser = require("rollup-plugin-terser").terser;
const pkg = require("../package.json");
const { builtinModules } = require("module");
const analyze = require("rollup-plugin-analyzer");
const typescript = require("rollup-plugin-typescript2");
const ttypescript = require("ttypescript");
const vue = require("rollup-plugin-vue");
const closure = require("@ampproject/rollup-plugin-closure-compiler");
const { existsSync, statSync } = require("fs");
const { exit } = require("process");
const { join } = require("path");

const moduleSystems = process.argv.slice(2).filter((i) => !i.startsWith("-"));
const switches = new Set(
  process.argv
    .slice(2)
    .filter((i) => i.startsWith("-"))
    .map((i) => i.replace(/^-(-){0,1}/, ""))
);

// makes all non-core deps external; allowing consuming app to gain better reuse
const external = [
  ...(pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : []),
  // @ts-ignore
  ...(pkg.optionalDependencies ? Object.keys(pkg.optionalDependencies) : []),
  ...builtinModules,
].map((i) => i.replace("@types/", ""));

// required for IIFE and UMD modules
const globals = {};

function getFilenameByModule(mod) {
  const shortname = getModuleShortname(mod);
  const outputFile = {
    // @ts-ignore
    es: pkg.module,
    cjs: pkg.main,
    // @ts-ignore
    typings: pkg.typings || pkg.types,
  };

  return Object.keys(outputFile).includes(shortname) && outputFile[shortname]
    ? outputFile[shortname]
    : `dist/${shortname}/index.js`;
}

/**
 * Reduce ES and CJS targets to just `es` and `cjs`
 *
 * @param {string} mod
 */
function getModuleShortname(mod) {
  const lowered = mod.toLowerCase();
  return lowered.startsWith("es") ? "es" : lowered.startsWith("commonjs") ? "cjs" : mod.toLowerCase();
}

function inferDirectory(file) {
  if (!file) {
    return "";
  }
  const fileParts = file.split("/");
  return fileParts.slice(0, fileParts.length - 1).join("/");
}

/**
 * create Rollup configuration
 *
 * @param {string} moduleSystem
 * @param {string} file
 * @param {boolean} minimized
 * @param {boolean} emitDeclaration
 */
const moduleConfig = (moduleSystem, file, minimized, emitDeclaration) => {
  try {
    const input = "src/index.ts";
    if (!existsSync(input)) {
      console.log(`The source entry point was set as "${input}" but this was not found!`);
      console.log();
      exit(1);
    }
    const outDir = inferDirectory(file);
    // @ts-ignore
    const declarationDir = pkg.typings
      ? // @ts-ignore
        inferDirectory(pkg.typings)
      : `dist/types`;
    console.log(`- the source's entrypoint is "${input}" and output will be put in "${outDir}" folder`);
    if (emitDeclaration) {
      console.log(`- the typings will also be generated and placed in the "${declarationDir}" directory`);
    }
    const tsconfigOverride = {
      compilerOptions: {
        ...(emitDeclaration ? { declaration: emitDeclaration, declarationDir } : {}),
        outDir,
        module: "esnext",
      },
      exclude: ["test", "tests", "node_modules"],
    };

    return {
      input,
      external,
      plugins: [
        vue({
          css: true,
          template: {
            isProduction: true,
          },
        }),
        commonjs(),
        json(),
        resolve(),
        typescript({
          tsconfig: "tsconfig.json",
          typescript: ttypescript,
          useTsconfigDeclarationDir: true,
          tsconfigOverride,
        }),
        ...(getModuleShortname(moduleSystem) === "es" &&
        // @ts-ignore
        (process.env.ANALYZE || switches.analyze)
          ? // @ts-ignore
            [analyze()]
          : []),
        // @ts-ignore
        ...(switches.has("closure") ? [closure()] : []),
        ...(minimized ? [terser()] : []),
      ],
    };
  } catch (e) {
    console.warn(`- 👎 the build failed building Rollup configuration: ${e.message}`);
    console.log(`\n${e.stack}\n`);
    process.exit(1);
  }
};

/**
 * Takes a path and filename and adds `.min` before the filename's extension.
 *
 * @param {string} filename
 * @param {boolean} isMin
 */
function minimizeFilename(filename, isMin) {
  if (isMin) {
    const parts = filename.split(".");
    filename = join(parts.slice(0, parts.length - 1).join("."), `.min.${parts.slice(-1)}`);
  }

  return filename;
}

/**
 * Uses Rollup API to bundle the repo.
 *
 * @param {string} m
 * @param {boolean} min
 * @param {boolean} emitDeclaration
 */
async function buildModule(m, min, emitDeclaration) {
  try {
    console.log(`- 📦 starting bundling of ${m.toUpperCase()} module ${min ? "(minimized)" : ""}`);
    if (switches.has("closure")) {
      console.log(`- using closure compiler to minimize file size`);
    }
    // @ts-ignore
    if (getModuleShortname(m) === "es" && !pkg.module) {
      console.log(
        `- 🤨 while you are building for the ES module system your package.json doesn't specify a "module" entrypoint.`
      );
    }
    const file = minimizeFilename(getFilenameByModule(m), min);
    console.log(`- transpiled source will be saved as: ${file}`);
    // build the configuration
    const config = moduleConfig(m, file, min, emitDeclaration);
    if (switches.has("v") || switches.has("verbose")) {
      console.log("- bundle config is:\n", JSON.stringify(config, null, 2));
    }
    const bundle = await rollup.rollup(config);

    await bundle.write({
      ...(usesGlobalVars(m) ? { name: pkg.name.replace(/-/g, ""), globals } : {}),
      file,
      // @ts-ignore
      format: getModuleShortname(m).startsWith("es") ? "es" : m,
      exports: "auto",
      sourcemap: false,
    });
    const output = statSync(file);
    console.log(`- 🚀 bundling saved to the "${file}" file [ ${Math.floor(output.size / 100) / 10} kb ].\n`);
  } catch (e) {
    console.warn(`- 👎 the build failed during Rollup bundling`);
    console.log(`\n${e.stack}\n`);
    process.exit(1);
  }
}

const usesGlobalVars = (mod) => {
  return ["umd", "iife"].includes(mod);
};

(async () => {
  const validModules = ["esnext", "es2020", "es2015", "commonjs", "iife", "umd"];
  const hasValidModules = moduleSystems.every((m) => validModules.includes(m));
  if (!hasValidModules) {
    console.log(
      `You specified an invalid module system. Valid module systems are: ${validModules.join(
        ", "
      )}; and you specified: ${moduleSystems.join(", ")}!\n`
    );
    process.exit(0);
  }

  console.log(`- Building library to ${moduleSystems.map((m) => m.toUpperCase()).join(", ")} modules.`);
  const relevantModules = external.filter((i) => !builtinModules.includes(i));

  if (Object.keys(relevantModules).length > 0) {
    console.log(
      `- While bundling will configure the following to be "external modules": ${relevantModules.join(", ")}`
    );
  }
  if (moduleSystems.includes("iife") || moduleSystems.includes("umd")) {
    console.log(
      `- The IIFE and UMD modules will link to global scope:\n\t${Object.keys(globals)
        .map((g) => `- "${g}" module found in global scope as "${globals[g]}"\n\t`)
        .join("")}`
    );
  }
  console.log();

  for (const m of moduleSystems) {
    const emitDeclaration = moduleSystems.length === 1 || getModuleShortname(m) === "es";
    await buildModule(m, false, emitDeclaration);
  }

  if (switches.has("min")) {
    if (!moduleSystems.includes("commonjs")) {
      throw new Error(
        "Minimization was requested but no CJS module was built; either include CJS module build or remove minimization"
      );
    }
    console.log("Building minimized version of CJS module system");
    await buildModule("commonjs", true, true);
  }

  console.log("\n- Build completed!\n");
})();
