//  externals

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    // 告诉webpack哪些苦不参与打包,同时使用的名称
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, 'dll/manifest.json'),
    }),
    // 将某个文件打包出去，并且在index.js中自动引入
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, 'dll/jquery.js'),
    }),
  ],
  mode: 'development',
};
