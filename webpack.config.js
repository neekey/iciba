var path = require('path');
var buildPath = path.resolve(__dirname, 'package');
var srcPath = path.resolve(__dirname, 'src');
var autoprefixer = require('autoprefixer');

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
        test: /\.(scss|css)$/,
        loaders: ['style', 'css?importLoaders=2&module&camelCase&localIdentName=[local]-[hash:5]', 'postcss', 'sass'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
      },
    ],
  },
  sassLoader: {
    data: '@import "' + path.resolve(__dirname, 'src/theme.scss') + '";'
  },
  postcss: function () {
    return [autoprefixer];
  },
};

webpackConfig.devtool = 'source-map';

module.exports = webpackConfig;
