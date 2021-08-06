// HMR: HOT MODULE replacement
// css: HMR OK
// html: default no HMR
// js: default no HMR
// entry: js,html separated
// html只有一个文件，没法优化，设置为多入口没有效果
// 修改js代码，来支持HMR
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// define environment variable
process.env.NODE_ENV = 'production';

// reusable loader
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        ident: 'postcss',
        plugins: ['postcss-preset-env'],
      },
    },
  },
];

module.exports = {
  entry: ['./src/index.js', './src/index.html'],
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...commonCssLoader],
      },
      {
        test: /\.less$/,
        use: [...commonCssLoader, 'less-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
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
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: 'imgs',
          esModule: false,
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        exclude: /\.(js|css|less|html|jpg|png|gif)/,
        loader: 'file-loader',
        options: {
          outputPath: 'media',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'build.css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // compress .html file
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
  // compress .js file
  mode: 'production',

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

    // hot module replace, only replace the changed file
    hot: true,
  },
};
