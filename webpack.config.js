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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'development',
  //解析模板的规则,
  // 简化文件查找路径
  // 缺点是：写路径时的提示失效
  resolve: {
    alias: {
      $css: resolve(__dirname, 'src/assets'),
    },
    // 配置省略文件的扩展名
    // 所以不同文件最好不要同名
    extensions: ['js', 'css', 'json', 'jsx'],
    // 告诉webpack解析模块去找哪个目录
    modules: [resolve(__dirname, '../node_modules'), 'node_modules'],
  },
};
