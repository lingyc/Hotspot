// const path = require('path');
// const webpack = require('webpack');
//
// const PATHS = {
//   compiled: path.join(__dirname, 'compiled'),
//   src: path.join(__dirname, 'Client')
// };
//
// module.exports = {
//   entry: {
//     src: PATHS.src
//   },
//   output: {
//     path: PATHS.compiled,
//     filename: 'app.bundle.js'
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         loader: 'babel'
//       }
//     ]
//   },
//   resolve: {
//     extensions: ['', '.js', '.jsx']
//   },
//   devServer: {
//     contentBase: PATHS.compiled,
//     historyApiFallback: true,
//     hot: true,
//     inline: true,
//     progress: true
//   },
//   plugins: [
//     new webpack.HotModuleReplacementPlugin()
//   ]
// };
module.exports = {
  entry: [
    './Client/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
