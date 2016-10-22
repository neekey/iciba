var path = require('path');
var webpack = require('webpack');
var buildPath = path.resolve(__dirname, 'package/assets');
var srcPath = path.resolve(__dirname, 'src');

var webpackConfig = {
  entry: {
    background: path.join(srcPath, 'background.js'),
    content: path.join(srcPath, 'content.js'),
    popup: path.join(srcPath, 'popup.js'),
  },
  output: {
    path: buildPath,
    filename: '[name].js',
  },
  module: {
    preLoaders: [{
      test: /.js$/,
      loader: 'eslint-loader',
      include: srcPath,
    }],
    loaders: [
      {
        test: /.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0'],
        },
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css?importLoaders=2&module&camelCase&localIdentName=[local]-[hash:5]'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
      },
    ],
  },
};

webpackConfig.devtool = 'source-map';

module.exports = webpackConfig;
