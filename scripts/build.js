/*
 * Script for production build
 */

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
process.env.FORCE_COLOR = 1;

const config = require('../.config/webpack.config');
const webpack = require('../.config/webpack');
const logger = require('../helpers/logger');

logger.info('Now building in ' + process.cwd());

// build js
webpack.run(config());
