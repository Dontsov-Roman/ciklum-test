var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
    modules: ['src', 'node_modules']
  },
  node: { fs: "empty" },
  module: {
    noParse: [/node_modules\/simple-dijs\/dist\/di.js/, /dtrace-provider/, /safe-json-stringify/, /mv/, /source-map-support/],
    rules: [
      { test: /\.(tsx|ts)?$/, exclude: /node_modules/, use: [{ loader: 'babel-loader' }, { loader: 'awesome-typescript-loader' }] },
      // { test: /^(?!.*\.spec\.js$).*\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, loader: 'file-loader?name=assets/[name].[hash].[ext]' },
      {
        test: /\.(ts|tsx)$/,
        loader: "tslint-loader",
        enforce: "pre",
        options: {
          emitErrors: true,
          failOnHint: true,
          configFile: './tslint.json'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    })
  ]
};