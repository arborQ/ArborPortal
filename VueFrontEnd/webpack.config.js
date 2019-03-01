var HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
var webpack = require('webpack'); //to access built-in plugins
var path = require('path');
var outPath = path.join(__dirname, './public');
var sourcePath = path.join(__dirname, './src');

var config = {
  entry: {
    main: [
      './src/main.js'
    ],
  },
  output: {
    path: outPath,
    publicPath: '/',
    filename: '[name].bundle.[chunkhash].js',
    chunkFilename: '[id].chunk.[chunkhash].js'

  },
  resolve: {
    extensions: ['.js', '.vue'],
    mainFields: ['main'],
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js',
      // '@': resolve('src'),
    }
  },
  mode: 'development',
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
    // rules: [{
    //     test: /\.vue$/,
    //     loader: 'vue-loader',
    //     options: vueLoaderConfig
    //   },
    //   {
    //     test: /\.tsx?$/,
    //     use: 'awesome-typescript-loader'
    //   },
    //   {
    //     test: /\.png$/,
    //     loader: 'file-loader'
    //   },
    //   {
    //     test: /\.pug$/,
    //     loader: 'pug-loader'
    //   },
    //   {
    //     test: /\.css$/,
    //     use: ['style-loader', 'css-loader']
    //   }
    // ]
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
    new HtmlWebpackPlugin({
      template: './src/index.html',
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
