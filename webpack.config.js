// optimization. oneOf. speed up the bundling

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

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
  entry: ['./src/index.js'],
  output: {
    filename: 'js/built.[contenthash:10].js',
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
          fix: true,
        },
      },
      {
        oneOf: [
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
              // babel cache
              // the second build will read the first cache
              cacheDirectory: true,
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
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'build.[contenthash:10].css',
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
  devtool: 'source-map',
};
