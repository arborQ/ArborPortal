// webpack.config.js

var HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
var webpack = require('webpack'); //to access built-in plugins
var path = require('path');
var outPath = path.join(__dirname, './public');
var sourcePath = path.join(__dirname, './src');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin');

var config = {
  entry: {
    main: [
      './src/index.tsx'
    ]
  },
  output: {
    path: outPath,
    publicPath: '/',
    filename: '[name].[hash].js',
    sourceMapFilename: '[name].[hash].map',
    chunkFilename: '[id].[hash].js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    mainFields: ['main'],
    alias: {
      "bx-utils": path.resolve(__dirname, './src/utils'),
      "bx-services": path.resolve(__dirname, './src/services'),
    }
  },
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
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          filename: 'vendors.[hash].js'
        },
      },
    },
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      filename: 'index.html',
      title: 'Webpack + Typescript',
      favicon: "content/icon.ico",
      minify: {
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        useShortDoctype: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true
      },
    }),
    new ResourceHintWebpackPlugin(),
    new HtmlWebpackExcludeAssetsPlugin()
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
