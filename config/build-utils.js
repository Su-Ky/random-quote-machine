const helpers = require('./helpers');

const APP_COMMON_CONFIG = require('./config.common.json');

const DEFAULT_METADATA = {
	title: APP_COMMON_CONFIG.title,
	description: APP_COMMON_CONFIG.description,
	baseUrl: '/',
	isDevServer: helpers.isWebpackDevServer(),
	E2E: !!process.env.BUILD_E2E,
	API_URL: APP_COMMON_CONFIG.apiUrl
};

exports.DEFAULT_METADATA = DEFAULT_METADATA;
