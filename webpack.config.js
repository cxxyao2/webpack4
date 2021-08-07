// optimization. oneOf. speed up the bundling
// terser-webpack-plugin version5 有问题，要用4
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
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
  entry: './src/index.js',
  output: {
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build'),
    chunkFilename: 'js/[name].[contenthash:10]_chunk.js',
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

  optimization: {
    splitChunks: {
      chunks: 'all',

      // 以下默认值，可以不写
      // minSize: 30 * 1024, // 分割的chunk最小为30kb，
      // maxSize: 0, // 最大没有限制
      // minChunks: 1, // 要提取的chunk最少被引用1次
      // maxAsyncRequests: 5, // 按需下载时并行加载的文件的最大数量为5
      // maxInitialRequests: 3, // 入口js文件最大并行请求数量
      // automaticNameDelimiter: '~', // 名称链接符号
      // name: true, // 可以使用命名规则
      // cacheGroups: {
      //   // 分割chunk的组
      //   // node_modules文件会被打包到 vendors组的chunk中. -->vendors~xxx.js
      //   // 满足上面的公共规则,如大小超过30KB,至少被引用一次
      //   vendors: {
      //     test: /[\\/]node_modules[\\/]/,
      //     priority: -10,
      //   },
      //   default: {
      //     // 要提取的chunk最少被引用2次，这个规则覆盖上面的提取一次的规则
      //     minChunks: 2,
      //     // 优先级别
      //     priority: -20,
      //     // 如果当前要打包的模块,和之前已经被提取的模块是同一个,就复用而不是重新打包
      //     reuseExistingChunk: true,
      //   },
      // },
    },
    // 将当前模块的记录其他模块的hash单独打包为一个文件 runtime
    // 问题：修改a.js文件导致b.js文件打包后hash值变化，
    // 修改配置后：a.js文件变了，重新打包后只有a.js和runtime.js这两个文件的hash值变,问题解决
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
    minimizer: [
      // 配置当前生产环境的压缩方案 js 和css
      new TerserWebpackPlugin({
        // 开启缓存
        cache: true,
        // 开启多进程打包
        parallel: true,
        // 启动source-map

        sourceMap: true,
      }),
    ],
  },
};
