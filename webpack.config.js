const path = require('path');
const webpack = require('webpack');

const PATHS = {
  compiled: path.join(__dirname, 'compiled'),
  src: path.join(__dirname, 'Client')
};

module.exports = {
  entry: {
    src: PATHS.src
  },
  output: {
    path: PATHS.compiled,
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    contentBase: PATHS.compiled,
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
