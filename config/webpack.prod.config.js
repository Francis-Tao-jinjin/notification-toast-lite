const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const BUILD = path.join(ROOT, 'build');

const devTsConfig = path.join(ROOT, 'dev.tsconfig.json');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, '../src/toast/index.tsx'),
    output: {
        path: BUILD,
        filename: 'notification-toast.bundle.js',
        // library: 'NotificationToast',    // to be available in global scope
        libraryTarget: 'umd',
    },
    resolve: {
        extensions: [
            '.tsx',
            '.ts',
            '.js',
        ],
        alias: {      // to prevent the multiple react problem
            react: path.resolve('./node_modules/react'),
            'react-dom': path.resolve('./node_modules/react-dom'),
        },
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
                test: /\.scss$/,
                use: [
                    'style-loader',   // creates style nodes from JS strings
                    'css-loader',     // translates CSS into CommonJS
                    'sass-loader',    // compiles Sass to CSS, using Node Sass by default
                ],
            },
        ],
    },
    externals: {
        // this is needed for react to resolve to a single react
        react: 'umd react',
        'react-dom': 'umd react-dom',
    },
}