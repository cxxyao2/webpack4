// focus on babel. transpile from js2016 to js5.
//  an arrow function () => this will be turned into an equivalent function expression
// if target is ES5 or lower

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                // load the polypill needed
                useBuiltIns: 'usage',
                corejs: { version: 3 },
                // compatible verison
                targets: {
                  chrome: '60',
                  firefox: '50',
                  ie: '9',
                  safari: '10',
                  edge: '17',
                },
              },
            ],
          ],
        },
      },
    ],
  },
  plugins: [],
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
