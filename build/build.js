/* eslint-disable @typescript-eslint/no-var-requires */
const rollup = require('rollup');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve').default;
const terser = require('rollup-plugin-terser').terser;
const pkg = require('../package.json');
const { builtinModules } = require('module');
const analyze = require('rollup-plugin-analyzer');
const typescript = require('rollup-plugin-typescript2');
const vue = require('rollup-plugin-vue');
const closure = require('@ampproject/rollup-plugin-closure-compiler');

const moduleSystems = process.argv.slice(2).filter(i => !i.startsWith('-'));
const switches = process.argv
  .slice(2)
  .filter(i => i.startsWith('--'))
  .reduce((acc, i) => {
    acc[i.replace(/^--/, '')] = true;
    return acc;
  }, {});

const usesTypescript = Object.keys(pkg.devDependencies).includes('typescript') ? true : false;

const input = `src/index.${usesTypescript ? 'ts' : 'js'}`;

// makes all non-core deps external; allowing consuming app to gain better reuse
const external = [
  ...(pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : []),
  ...(pkg.optionalDependencies ? Object.keys(pkg.optionalDependencies) : []),
  ...builtinModules,
].map(i => i.replace('@types/', ''));

// required for IIFE and UMD modules
const globals = {};

// Rollup configuration for the passed in module system
const moduleConfig = (moduleSystem, minimized) => ({
  input,
  external,
  plugins: [
    commonjs(),
    resolve(),
    vue({
      css: true,
      template: {
        isProduction: true,
      },
    }),
    typescript({
      tsconfig: 'tsconfig.es.json',
      target: minimized ? 'es2015' : 'esnext',
      outDir: `dist/${moduleSystem}`,
      declaration: false,
    }),

    ...(moduleSystem === 'es' && (process.env.ANALYZE || switches.analyze) ? [analyze()] : []),
    ...(switches.closure ? [closure()] : []),
    ...(minimized ? [terser()] : []),
  ],
});

async function buildModule(m, min) {
  console.log(`- building ${m.toUpperCase()} module ${min ? '(minimized)' : ''}`);
  const bundle = await rollup.rollup(moduleConfig(m, min));
  await bundle.write({
    ...(usesGlobalVars(m) ? { name: pkg.name.replace(/-/g, ''), globals } : {}),
    file: `dist/${m}/index${min ? '.min' : ''}.js`,
    format: m,
    sourcemap: false,
  });
}

const usesGlobalVars = mod => {
  return ['umd', 'iife'].includes(mod);
};
(async () => {
  const validModules = ['es', 'cjs', 'iife', 'umd'];
  const hasValidModules = moduleSystems.every(m => validModules.includes(m));
  if (!hasValidModules) {
    console.log(
      `You specified an invalid module system. Valid module systems are: ${validModules.join(
        ', ',
      )}; and you specified: ${moduleSystems.join(', ')}!\n`,
    );
    process.exit(0);
  }

  console.log(`- Building library to ${moduleSystems.map(m => m.toUpperCase()).join(', ')} modules.`);
  console.log(`- The entry point to the library is: ${input}`);
  console.log(
    `- While bundling will configure the following to be "external modules": ${external
      .filter(i => !builtinModules.includes(i))
      .join(', ')}.`,
  );
  if (moduleSystems.includes('iife') || moduleSystems.includes('umd')) {
    console.log(
      `- The IIFE and UMD modules will link to global scope:\n\t${Object.keys(globals)
        .map(g => `- "${g}" module found in global scope as "${globals[g]}"\n\t`)
        .join('')}`,
    );
  }
  console.log();

  for (let m of moduleSystems) {
    await buildModule(m, false);
  }

  if (switches.min) {
    if (!moduleSystems.includes('cjs')) {
      throw new Error(
        'Minimization was requested but no CJS module was built; either include CJS module build or remove minimization',
      );
    }
    console.log('Building minimized version of CJS module system');
    await buildModule('cjs', true);
  }

  console.log('\n- Build completed!\n');
})();
