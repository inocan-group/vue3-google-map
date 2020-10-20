const rollup = require('rollup')
const commonjs = require('@rollup/plugin-commonjs')
const resolve = require('@rollup/plugin-node-resolve').default
const terser = require('rollup-plugin-terser').terser
const { builtinModules } = require('module')

const pkg = require('../package.json')

const input = `dist/cjs/index.js`
const external = [
  ...(pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : []),
  ...(pkg.optionalDependencies ? Object.keys(pkg.optionalDependencies) : []),
  ...builtinModules,
].map(i => i.replace('@types/', ''))

const moduleConfig = () => ({
  input,
  external,
  plugins: [commonjs(), resolve(), terser()],
})

;(async () => {
  const bundle = await rollup.rollup(moduleConfig())
  await bundle.write({
    file: `dist/cjs/minime.js`,
    format: 'cjs',
    sourcemap: false,
  })
})()
