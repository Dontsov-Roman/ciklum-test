var webpack = require('webpack');
var path = require('path');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.config.common.js');
var WebpackNotifierPlugin = require('webpack-notifier');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
    devtool: 'inline-source-map',
    mode: "production",
    entry: {
        polyfills: 'polyfills.ts',
        app: 'index.tsx'
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js',
        publicPath: ''
    },
    module: {
        rules: [
            { test: /.js$/, loader: 'babel-loader' },
            { test: /\.html$/, loader: 'html-loader', options: { minimize: true } }
        ]
    },
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 240000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
              vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10
              },
              default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
              }
            }
          }
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV),
                NODE_ENV: JSON.stringify('production')
            },
            '__DEV__': JSON.stringify(false),
            '__JEST__': JSON.stringify(false)
        })
    ]
});