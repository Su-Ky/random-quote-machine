const helpers = require('./helpers');

/**
 * Webpack Plugins
 *
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackInlineManifestPlugin = require('webpack-inline-manifest-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const buildUtils = require('./build-utils');
/**
 * Webpack configuration
 *
 * See: https://webpack.js.org/configuration/
 */
module.exports = function (options) {
	const isProd = options.env === 'production';
	const APP_CONFIG = require(isProd ? './config.prod.json' : './config.dev.json');

	const METADATA = Object.assign({}, buildUtils.DEFAULT_METADATA, options.metadata || {});

	return {
		/**
		 * The entry point for the bundle
		 * Our Angular.js app
		 *
		 * See: https://webpack.js.org/configuration/entry-context/#entry
		 */
		entry: './src/app.jsx',

		/**
		 * Options affecting the resolving of modules.
		 *
		 * See: https://webpack.js.org/configuration/resolve/
		 */
		resolve: {
			alias: {
				'react': 'inferno-compat',
				'react-dom': 'inferno-compat',
				'react-redux': 'inferno-redux',
				'configureStore': `${helpers.root('src/store/configure/configureStore.')}${isProd ? 'prod': 'dev' }.js`
			},
			/**
			 * An array of extensions that should be used to resolve modules.
			 *
			 * See: https://webpack.js.org/configuration/resolve/#resolve-extensions
			 */
			extensions: ['.jsx', '.js', '.json'],
		},

		/**
		 * Options affecting the normal modules.
		 *
		 * See: https://webpack.js.org/configuration/module/
		 */
		module: {

			rules: [
				{
					test: /\.jsx?$/,
					use: 'babel-loader',
					exclude: /node_modules/
				},
				/**
				 * Raw loader support for *.html
				 * Returns file content as string
				 *
				 * See: https://github.com/webpack/raw-loader
				 */
				{
					test: /\.html$/,
					use: 'raw-loader',
					exclude: [helpers.root('src/index.html')]
				},

				{
					test: /\.(jpg|png|gif)$/,
					use: 'file-loader'
				},

				{
					test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
					use: 'file-loader'
				}

			],

		},

		/**
		 * Add additional plugins to the compiler.
		 *
		 * See: https://webpack.js.org/configuration/plugins/
		 */
		plugins: [
			/**
			 * Plugin: DefinePlugin
			 * Description: Define free variables.
			 * Useful for having development builds with debug logging or adding global constants.
			 *
			 * Environment helpers
			 *
			 * See: https://webpack.js.org/plugins/define-plugin/
			 */
			// NOTE: when adding more properties make sure you include them in custom-typings.d.ts
			new DefinePlugin({
				'ENV': JSON.stringify(METADATA.ENV),
				'process.env.ENV': JSON.stringify(METADATA.ENV),
				'process.env.NODE_ENV': JSON.stringify(METADATA.ENV),
				'API_URL': JSON.stringify(METADATA.API_URL)
			}),
			/**
			 * Plugin: CopyWebpackPlugin
			 * Description: Copy files and directories in webpack.
			 *
			 * Copies project static assets.
			 *
			 * See: https://www.npmjs.com/package/copy-webpack-plugin
			 */
			new CopyWebpackPlugin([
					{from: 'src/assets', to: 'assets'},
					{from: 'src/favicon.ico', to: 'favicon.ico'}
					// { from: 'src/meta'}
				],
				isProd ? {ignore: ['mock-data/**/*']} : undefined
			),

			/*
      * Plugin: HtmlWebpackPlugin
      * Description: Simplifies creation of HTML files to serve your webpack bundles.
      * This is especially useful for webpack bundles that include a hash in the filename
      * which changes every compilation.
      *
      * See: https://github.com/ampedandwired/html-webpack-plugin
      */
			new HtmlWebpackPlugin({
				template: 'src/index.html',
				title: METADATA.title,
				metadata: METADATA,
				// gtmKey: GTM_API_KEY,
				inject: 'body',
				xhtml: true,
				minify: isProd ? {
					caseSensitive: true,
					collapseWhitespace: true,
					keepClosingSlash: true,
					removeComments: true
				} : false
			}),

			/**
			 * Plugin: ScriptExtHtmlWebpackPlugin
			 * Description: Enhances html-webpack-plugin functionality
			 * with different deployment options for your scripts including:
			 *
			 * See: https://github.com/numical/script-ext-html-webpack-plugin
			 */
			new ScriptExtHtmlWebpackPlugin({
				sync: /inline|polyfills|vendor/,
				defaultAttribute: 'async',
				preload: [/polyfills|vendor|main/],
				prefetch: [/chunk/]
			}),

			/**
			 * Plugin LoaderOptionsPlugin (experimental)
			 *
			 * See: https://gist.github.com/sokra/27b24881210b56bbaff7
			 */
			new LoaderOptionsPlugin({}),


			/**
			 * Plugin: WebpackInlineManifestPlugin
			 * Inline Webpack's manifest.js in index.html
			 *
			 * https://github.com/almothafar/webpack-inline-manifest-plugin
			 */
			new WebpackInlineManifestPlugin(),
		],

		/**
		 * Include polyfills or mocks for various node stuff
		 * Description: Node configuration
		 *
		 * See: https://webpack.js.org/configuration/node/
		 */
		node: {
			global: true,
			crypto: 'empty',
			process: true,
			module: false,
			clearImmediate: false,
			setImmediate: false
		}
	};
};
