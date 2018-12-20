// webpack.config.js

var HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
var webpack = require('webpack'); //to access built-in plugins
var path = require('path');
var outPath = path.join(__dirname, './public');
var sourcePath = path.join(__dirname, './src');

var config = {
  entry: {
    main: [
      './src/index.tsx'
    ],
    // vendor: [
    //   'react',
    //   'react-dom',
    // ],
    // bx: [
    //   "bx-utils",
    //   "bx-ui",
    // ],
    // polifil: [
    //   "dialog-polyfill",
    // ]
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
  mode: 'development',
  target: 'web',
  devtool: 'source-map',
  devServer: {
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
    // new webpack.LoaderOptionsPlugin({
    //   options: {
    //     context: sourcePath,
    //     postcss: [
    //       require('postcss-import')({
    //         addDependencyTo: webpack
    //       }),
    //       require('postcss-url')(),
    //       require('postcss-cssnext')(),
    //       require('postcss-reporter')(),
    //       require('postcss-browser-reporter')({
    //         disabled: false
    //       }),
    //     ]
    //   }
    // }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      filename: 'index.html',
      title: 'Webpack + Typescript',
      favicon: "content/icon.ico",
    }),
    // new CircularDependencyPlugin({
    //   exclude: /a\.js|node_modules/,
    //   failOnError: true,
    //   cwd: process.cwd(),
    // })
  ],

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  }
};

module.exports = config;
