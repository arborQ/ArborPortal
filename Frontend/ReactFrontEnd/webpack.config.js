// webpack.config.js

var HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
var webpack = require('webpack'); //to access built-in plugins
var path = require('path');
const fs = require('fs');
var outPath = path.join(__dirname, './bin/public');
var sourcePath = path.join(__dirname, './src');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin');

var config = {
  entry: {
    main: './src/index.tsx',
    config: './src/config.ts'
  },
  output: {
    path: outPath,
    publicPath: '/',
    filename: 'content/[name].[hash:8].js',
    sourceMapFilename: 'content/[name].[hash:8].map',
    chunkFilename: 'content/[name].[hash:8].js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    mainFields: ['main'],
    alias: {
      "@bx-utils": path.resolve(__dirname, './src/utils'),
      "@bx-services": path.resolve(__dirname, './src/services'),
      "@bx-translations": path.resolve(__dirname, './src/translations'),
      "@bx-components" : path.resolve(__dirname, './src/components'),
      "@bx-contexts" : path.resolve(__dirname, './src/contexts'),
    }
  },
  target: 'web',
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    port: 8080,
    contentBase: sourcePath,
    stats: {
      warnings: false
    },
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: ['babel-loader', 'awesome-typescript-loader']
    },
    { test: /\.png$/, loader: 'file-loader' },
    { test: /\.pug$/, loader: 'pug-loader' },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
    ]
  },
  optimization: {
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
          chunks: "initial",
          test: /[\\/]node_modules[\\/]/,
          priority: -10
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
    new webpack.HashedModuleIdsPlugin(),
    // new CleanWebpackPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.optimize.AggressiveMergingPlugin(),
    new HtmlWebpackPlugin({
      prefetch: ['**/*.*'],
      preload: ['**/*.*'],
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
    // new webpack.AutomaticPrefetchPlugin(),
    // new ResourceHintWebpackPlugin(),
    // new HtmlWebpackExcludeAssetsPlugin()
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
