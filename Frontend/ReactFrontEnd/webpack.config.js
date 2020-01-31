// webpack.config.js

var HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
var webpack = require('webpack'); //to access built-in plugins
var path = require('path');
var outPath = path.join(__dirname, './bin/public');

var config = {
	entry: {
		main: './src/index.tsx'
	},
	output: {
		path: outPath,
		publicPath: '/',
		filename: 'content/[name].[contenthash:8].js',
		sourceMapFilename: 'content/[name].[contenthash:8].map',
		chunkFilename: 'content/[name].[contenthash:8].js'
	},
	resolve: {
		extensions: [ '.js', '.ts', '.tsx', '.json' ],
		mainFields: [ 'main' ],
		alias: {
			'@bx-utils': path.resolve(__dirname, './src/utils'),
			'@bx-services': path.resolve(__dirname, './src/services'),
			'@bx-translations': path.resolve(__dirname, './src/translations'),
			'@bx-components': path.resolve(__dirname, './src/components'),
			'@bx-contexts': path.resolve(__dirname, './src/contexts')
		}
	},
	target: 'web',
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				loader: require.resolve('babel-loader'),
				options: {
					presets: [ [ 'react-app', { flow: false, typescript: true } ] ]
				}
			},
			{ test: /\.png$/, loader: 'file-loader' },
			{ test: /\.pug$/, loader: 'pug-loader' },
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			prefetch: [ '**/*.*' ],
			preload: [ '**/*.*' ],
			template: './src/index.pug',
			filename: 'index.html',
			title: 'Webpack + Typescript',
			favicon: 'content/icon.ico',
			minify: {
				minifyJS: true,
				minifyCSS: true,
				removeComments: true,
				useShortDoctype: true,
				collapseWhitespace: true,
				collapseInlineTagWhitespace: true
			}
		})
	],

	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	},
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000
	}
};

module.exports = config;
