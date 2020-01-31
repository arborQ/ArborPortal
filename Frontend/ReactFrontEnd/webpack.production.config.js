var webpackConfig = require('./webpack.config');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

process.env.NODE_ENV = 'production';

webpackConfig.optimization = {
	minimize: false,
	minimizer: [
		new UglifyJsPlugin({
			uglifyOptions: {
				output: {
					comments: false
				}
			}
		})
	],
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
				chunks: 'initial',
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
};

module.exports = webpackConfig;
