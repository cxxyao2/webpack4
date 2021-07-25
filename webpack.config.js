const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtraPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // create style tag ,<style>..</style>, insert into .html file
          // 'style-loader',
          // extract css into an independent file, not into style tag
          MiniCssExtraPlugin.loader,
          // put css into js file. In .js file, import './**.css';
          'css-loader',
        ],
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
          outputPath: 'imgs',
        },
      },
      {
        // extract images in <img src=""  />
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        exclude: /\.(less|css|html|js|jpg|pgn|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtraPlugin({
      // rename output file
      filename: 'css/build.css',
    }),
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
