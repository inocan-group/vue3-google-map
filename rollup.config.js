import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript2 from 'rollup-plugin-typescript2'
import pkg from './package.json'
import vue from 'rollup-plugin-vue'
import { builtinModules } from 'module'
import analyze from 'rollup-plugin-analyzer'
import ttypescript from 'ttypescript'

const generalConfig = moduleSystem => ({
  input: 'src/components/index.ts',
  output: {
    dir: `dist/${moduleSystem}`,
    format: `${moduleSystem}`,
    sourcemap: false,
  },
  external: [
    ...(pkg.dependencies ? Object.keys(pkg.dependencies) : []),
    ...(pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : []),
    ...(pkg.optionalDependencies ? Object.keys(pkg.optionalDependencies) : []),
    ...builtinModules,
  ],
  plugins: [
    commonjs(),
    resolve(),
    vue({
      css: true,
      template: {
        isProduction: true,
      },
    }),
    typescript2({
      rootDir: '.',
      tsconfig: `tsconfig.es.json`,
      typescript: ttypescript,
      declaration: true,
    }),
    ...(moduleSystem === 'es' ? [analyze()] : []),
  ],
})

export default [generalConfig('cjs'), generalConfig('es')]
