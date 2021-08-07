//  externals

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],

  mode: 'production',
  externals: {
    // 拒绝jquery打包进来，库名和对应的包名
    // 在index.js中引入 <script type="text/javascript" src=".."></script>
    jquery: 'jQuery',
  },
};
