const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtraPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// set environment variable
process.env.NODE_ENV = 'development';

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          // automatically fix errors
          fix: true,
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtraPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtraPlugin({
      // rename output file
      filename: 'css/build.css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  mode: 'development',

  // development server (automatically bundled, fresh browser)
  // bundled files only exist in memory ,not in build folder
  // $npx webpack-dev-server
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    // gzip
    compress: true,
    port: 3000,
    // automatically open a local browser
    open: true,
  },
};
