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
  devServer: {
    // 运行代码的目录
    contentBase: resolve(__dirname, 'build'),
    // 监视 contentBase下所有文件,有变化就重新打包
    watchContentBase: true,
    //  忽略文件
    watchOptions: {
      // 忽略文件
      ignored: /node_modules/,
    },
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 5000,
    // 域名
    host: 'localhost',
    // 自动打开浏览器
    open: true,
    // 开启hmr
    hot: true,
    // 不要 显示启动服务器日志
    clientLogLevel: 'none',
    // 除了一些基本启动信息以外,其他内容不要显示
    quiet: true,
    // 如果出错了,不要全屏提示
    overlay: false,
    // 服务器代理 -> 解决开发环境的跨域问题， 服务器与服务器之间是没有跨域问题的
    // 一旦devServer(5000)服务器收到'/api/XXX'
    // 把请求转发到另外一个服务器 localhost:3000
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // 请求路径时重写,将 /api/xxx -> /xxx （去掉api）
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
