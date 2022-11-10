const postcss = require('rollup-plugin-postcss');
const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const json = require('@rollup/plugin-json');
const svg = require('rollup-plugin-svg');
const image = require('@rollup/plugin-image');

module.exports = {
    input: './src/index.ts',
    output: {
        file: './dist/index.js',
        format: 'esm',
        sourcemap: true,
    },
    external: ['react', 'react-dom'],
    plugins: [
        svg(),
        json(),
        commonjs({
            include: /node_modules/,
            requireReturnsDefault: 'auto',
        }),
        typescript({}),
        nodeResolve(),
        image(),
        postcss({
            config: {
                path: './postcss.config.js',
            },
            extensions: ['.css'],
            minimize: true,
            inject: {
                insertAt: 'top',
            },
        }),
    ],
};
