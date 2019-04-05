const helpers = require('./helpers');
const buildUtils = require('./build-utils');

/**
 * Used to merge webpack configs
 */
const webpackMerge = require('webpack-merge');
/**
 * The settings that are common to prod and dev
 */
const commonConfig = require('./webpack.common.js');

/**
 * Webpack Plugins
 */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HashedModuleIdsPlugin = require('webpack/lib/HashedModuleIdsPlugin');
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = function (env) {
	const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
	const METADATA = Object.assign({}, buildUtils.DEFAULT_METADATA, {
		host: process.env.HOST || 'localhost',
		port: process.env.PORT || 8000,
		baseURL: 'http://localhost:8000',
		ENV: ENV
	});

	return webpackMerge(commonConfig({env: ENV, metadata: METADATA}), {
			mode: 'production',
			/**
			 * Options affecting the output of the compilation.
			 *
			 * See: https://webpack.js.org/configuration/output/
			 */
			output: {

				/**
				 * The output directory as absolute path (required).
				 *
				 * See: https://webpack.js.org/configuration/output/#output-path
				 */
				// TODO:
				path: helpers.root('public'),

				/**
				 * Specifies the name of each output file on disk.
				 * IMPORTANT: You must not specify an absolute path here!
				 *
				 * See: https://webpack.js.org/configuration/output/#output-filename
				 */
				filename: '[chunkhash].js',

				/**
				 * The filename of non-entry chunks as relative path
				 * inside the output.path directory.
				 *
				 * See: https://webpack.js.org/configuration/output/#output-chunkfilename
				 */
				chunkFilename: '[chunkhash].js'

			},

			module: {

				rules: [
					/**
					 * Extract CSS files from .src/styles directory to external CSS file
					 */
					{
						test: /\.css$/,
						use: [
							MiniCssExtractPlugin.loader,
							'css-loader'
						],
						include: [helpers.root('src')]
					},

					/**
					 * Extract and compile SCSS files from .src/styles directory to external CSS file
					 */
					{
						test: /\.scss$/,
						use: [
							MiniCssExtractPlugin.loader,
							'css-loader',
							'sass-loader'
						],
						include: [helpers.root('src')]
					},

				]

			},
			optimization: {
				splitChunks: {
					chunks: "all",
					minSize: 30000,
					minChunks: 2,
					maxAsyncRequests: 5,
					maxInitialRequests: 10,
					automaticNameDelimiter: '~',
					name: true,
					cacheGroups: {
						vendors: {
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
			/**
			 * Add additional plugins to the compiler.
			 *
			 * See: https://webpack.js.org/configuration/plugins/
			 */
			plugins: [
				/** MiniCssExtractPlugin
				 * Plugin:
				 * Description: Extracts imported CSS files into external stylesheet
				 *
				 * See: https://webpack.js.org/plugins/mini-css-extract-plugin/
				 */
				new MiniCssExtractPlugin({
					filename: "[contenthash].css"
				}),

				new HashedModuleIdsPlugin(),
				new ModuleConcatenationPlugin(),
				new UglifyJsPlugin({
					sourceMap: false,
					parallel: true,
					cache: helpers.root('webpack-cache/uglify-cache'),
					uglifyOptions: {
						ecma: 5,
						warnings: false,
						ie8: false,
						mangle: true,
						compress: {
							pure_getters: true, /* buildOptimizer */
							passes: 3         /* buildOptimizer */
						},
						output: {
							ascii_only: true,
							comments: false
						}
					}
				})
			],

			/**
			 * Include polyfills or mocks for various node stuff
			 * Description: Node configuration
			 *
			 * See: https://webpack.js.org/configuration/node/
			 */
			node:
				{
					global: true,
					crypto:
						'empty',
					process:
						false,
					module:
						false,
					clearImmediate:
						false,
					setImmediate:
						false,
					fs:
						'empty'
				}
		}
	)
		;
}
;
