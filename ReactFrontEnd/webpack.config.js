// webpack.config.js

var HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
var webpack = require('webpack'); //to access built-in plugins
var path = require('path');
var outPath = path.join(__dirname, './public');
var sourcePath = path.join(__dirname, './src');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var config = {
  entry: {
    main: [
      './src/index.tsx'
    ],
  },
  output: {
    path: outPath,
    publicPath: '/',
    filename: '[name].bundle.[chunkhash].js',
    chunkFilename: '[id].chunk.[chunkhash].js'

  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    mainFields: ['main'],
    alias: {
      "bx-utils": path.resolve(__dirname, './src/utils'),
      "bx-services": path.resolve(__dirname, './src/services'),
    }
  },
<<<<<<< HEAD
=======
  mode: 'production',
>>>>>>> b7b933777e4f0f307e4a22121d78c36152507460
  target: 'web',
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: sourcePath,
    stats: {
      warnings: false
    },
  },
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
  // optimization: {
  //   runtimeChunk: 'single',
  //   splitChunks: {
  //     chunks: 'async',
  //     minSize: 30000,
  //     maxSize: 0,
  //     minChunks: 1,
  //     maxAsyncRequests: 5,
  //     maxInitialRequests: 3,
  //     automaticNameDelimiter: '~',
  //     name: true,
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: -10,
  //       },
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true
  //       } 
  //     }
  //   }
  // },
  plugins: [
    new CleanWebpackPlugin(),
    // new webpack.optimize.AggressiveMergingPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      filename: 'index.html',
      title: 'Webpack + Typescript',
      favicon: "content/icon.ico",
    }),
  ],

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
};

module.exports = config;
