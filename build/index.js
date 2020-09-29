/* eslint-disable @typescript-eslint/no-var-requires */
const rollup = require('rollup')
const commonjs = require('@rollup/plugin-commonjs')
const resolve = require('@rollup/plugin-node-resolve').default
const terser = require('rollup-plugin-terser').terser
const pkg = require('../package.json')
const { builtinModules } = require('module')
const analyze = require('rollup-plugin-analyzer')
const typescript = require('rollup-plugin-typescript2')
const vue = require('rollup-plugin-vue')

const usesTypescript = Object.keys(pkg.devDependencies).includes('typescript') ? true : false

const input = `src/index.${usesTypescript ? 'ts' : 'js'}`

// makes all non-core deps external; allowing consuming app to gain better reuse
const external = [
  ...(pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : []),
  ...(pkg.optionalDependencies ? Object.keys(pkg.optionalDependencies) : []),
  ...builtinModules,
]

// required for IIFE and UMD modules
const globals = {}

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
    ...(usesTypescript
      ? [
          typescript({
            rootDir: '.',
            tsconfig: 'tsconfig.es.json',
            typescript: require('ttypescript'),
            declaration: false,
          }),
        ]
      : []),
    ...(moduleSystem === 'es' && process.env.ANALYZE ? [analyze()] : []),
    ...(minimized ? [terser()] : []),
  ],
})

const usesGlobalVars = mod => {
  return ['umd', 'iife'].includes(mod)
}
;(async () => {
  const mods = process.argv.slice(2)
  const validModules = ['es', 'cjs', 'iife', 'umd']
  const hasValidModules = mods.every(m => validModules.includes(m))
  if (!hasValidModules) {
    console.log(
      `You specified an invalid module system. Valid module systems are: ${validModules.join(
        ', ',
      )}; and you specified: ${mods.join(', ')}!\n`,
    )
    process.exit(0)
  }

  console.log(`- Building library to ${mods.map(m => m.toUpperCase()).join(', ')} modules.`)
  console.log(`- The entry point to the library is: ${input}`)
  console.log(
    `- While bundling will configure the following to be "external modules": ${external
      .filter(i => !builtinModules.includes(i))
      .join(', ')}.`,
  )
  if (mods.includes('iife') || mods.includes('umd')) {
    console.log(
      `- The IIFE and UMD modules will link to global scope:\n\t${Object.keys(globals)
        .map(g => `- "${g}" module found in global scope as "${globals[g]}"\n\t`)
        .join('')}`,
    )
  }
  console.log()

  // add minification step for CJS builds only
  if (mods.includes('cjs')) {
    mods.push('cjs-min')
  }

  for (let m of mods) {
    let min = false
    if (m.includes('-min')) {
      m = m.replace('-min', '')
      min = true
    }
    console.log(`- building ${m.toUpperCase()} module ${min ? '(minimized)' : ''}`)
    const bundle = await rollup.rollup(moduleConfig(m, min))
    await bundle.write({
      ...(usesGlobalVars(m) ? { name: pkg.name.replace(/-/g, ''), globals } : {}),
      file: `dist/${m}/index${min ? '.min' : ''}.js`,
      format: m,
      sourcemap: false,
    })
  }

  console.log('\n- Build completed!\n')
})()
