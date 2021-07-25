const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          // if image size < 8M, compile it to base64 string
          limit: 8 * 1024,
          // url-loader default es6 ==> <img src=[object Module] />
          // commonjs
          esModule: true,
          // [ext]the extension of initial image file
          name: '[hash:10].[ext]',
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        exclude: /\.(less|css|html|js|jpg|pgn|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
        },
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
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
