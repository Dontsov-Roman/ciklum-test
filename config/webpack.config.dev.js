var webpack = require('webpack');
var path = require('path');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.config.common.js');
var WebpackNotifierPlugin = require('webpack-notifier');

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';

module.exports = webpackMerge(commonConfig, {
  devtool: 'inline-source-map',
  mode: "development",
  entry: {
    hotLoader: ['react-hot-loader/patch', 'webpack/hot/only-dev-server'],
    devServer: 'webpack-dev-server/client?http://localhost:3000',
    app: 'index.tsx'
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      // { test: /.js$/, loader: 'babel-loader' }, // for test in IE11 localy
      { test: /\.html$/, loader: 'html-loader' },
    ]
  },
  optimization: {
    concatenateModules: false
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WebpackNotifierPlugin({ alwaysNotify: true }),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      },
      '__DEV__': JSON.stringify(true),
      'KIOSK_API_URL': JSON.stringify(process.env.KIOSK_API_URL)
    })
  ],
  devServer: {
    // colors: true,
    historyApiFallback: true,
    inline: true,
    port: 3000,
    hot: true,
    publicPath: '/',
    contentBase: 'dist/'
  }
});