const webpack = require('webpack');
const formatMessages = require('webpack-format-messages');
const logger = require('../helpers/logger');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  run: (config) => {
    const compiler = webpack(config);

    const callback = (err, stats) => {
      const messages = formatMessages(stats);

      if (!messages.errors.length && !messages.warnings.length) {
        logger.success('Compiled js successfully');
      }

      if (messages.errors.length) {
        logger.error('Failed to compile js');
        messages.errors.forEach(e => logger.info(e));
        return;
      }

      if (messages.warnings.length) {
        logger.warn('Compiled js with warnings.');
        messages.warnings.forEach(w => logger.info(w));
      }
    };

    if (isDev) {
      compiler.watch(config, callback);
    } else {
      compiler.run(callback);
    }
  }
}