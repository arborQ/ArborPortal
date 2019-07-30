// webpack.config.js

var webpack = require('webpack'); //to access built-in plugins
var path = require('path');

var config = {
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    mainFields: ['main'],
    alias: {
      "bx-utils": path.resolve(__dirname, '../src/utils'),
      "bx-services": path.resolve(__dirname, '../src/services'),
    }
  },
  mode: 'development',
  target: 'web',
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'awesome-typescript-loader'
    },
    { test: /\.png$/, loader: 'file-loader' },
    { test: /\.pug$/, loader: 'pug-loader' },
    {
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ]
    }
  ]
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
  ],

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};

module.exports = config;
