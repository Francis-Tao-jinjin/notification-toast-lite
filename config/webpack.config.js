const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const BUILD = path.join(ROOT, 'build');
const htmlEntry = path.join(ROOT, 'public/index.html');
const icoEntry = path.join(ROOT, 'public/cat.ico');

const devTsConfig = path.join(ROOT, 'dev.tsconfig.json');

const devOptions = {
    mode: 'development',
    devtool: 'inline-source-map',
    watchOptions: {
        aggregateTimeout: 0, // debounce time for re-compile
        ignored: ['node_modules/**'],
    },
};

module.exports = {
    entry: path.resolve(__dirname, '../src/index.ts'),
    output: {
        path: BUILD,
        filename: 'notification-toast.bundle.js',
    },
    resolve: {
        extensions: [
            '.tsx',
            '.ts',
            '.js',
        ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: devTsConfig,
                        },
                    },
                ],
                include: SRC,
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',   // creates style nodes from JS strings
                    'css-loader',     // translates CSS into CommonJS
                    'sass-loader',    // compiles Sass to CSS, using Node Sass by default
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: htmlEntry,
            favicon: icoEntry,
            filename: 'index.html',
        }),
    ],
    ...devOptions,
}