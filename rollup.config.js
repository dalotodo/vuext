// rollup.config.js
import merge from 'deepmerge';
import typescript from '@rollup/plugin-typescript'
import { babel } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from "rollup-plugin-terser"


export default [
  merge({}, {
    external: ['vue', 'vuex'],
    input: './src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
    },
    plugins: [nodeResolve(), typescript({ tsconfig: "tsconfig.build.json" }), babel({ babelHelpers: 'bundled' }), terser() ]
  }),
];