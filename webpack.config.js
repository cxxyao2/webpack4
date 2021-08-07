//  externals

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    // 文件名称(指定名称 + 目录)
    filename: 'js/[name].js',
    // 输出文件目录(将来所有资源输出的公共目录)
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      // loader的配置
      // 单个用loader,多个用use 【‘’，‘’】
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // only check js files under src folder
        include: resolve(__dirname, 'src'),
        enforce: 'pre',
        // 延后执行 postpone
        // enforce:'post'
        loader: 'eslint-loader',
        options: {},
      },
      {
        // 以下配置只生效一个
        oneOf: [],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'development',
};
