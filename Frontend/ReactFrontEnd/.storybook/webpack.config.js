// webpack.config.js

var webpack = require('webpack'); //to access built-in plugins
var path = require('path');

var config = {
	resolve: {
		extensions: [ '.js', '.ts', '.tsx' ],
		mainFields: [ 'main' ],
		alias: {
			'bx-utils': path.resolve(__dirname, '../src/utils'),
			'bx-services': path.resolve(__dirname, '../src/services')
		}
	},
	mode: 'development',
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

	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	}
};

module.exports = config;
