const { resolve } = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },
  module:{
    rules:[
      // loaders 
    ]
  },
  plugins:[
    // plugins
  ],
  mode: 'development',
};
