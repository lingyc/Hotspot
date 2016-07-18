const path = require('path');
const webpack = require('webpack');

const PATHS - {
  compiled: path.join(__dirname, 'compiled'),
  src: path.join(__dirname, 'Client/component')
};

module.exports = {
  entry: {
    src: PATHS.src
  },
  output: {
    path: PATHS.build,
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel'
      }
    ]
  }
}