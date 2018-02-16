const fs = require('fs');
const mkdirp = require('mkdirp');
const parallel = require('run-parallel');
const shell = require('shelljs');
const sass = require('node-sass');
const postcss = require('postcss')
const logger = require('../helpers/logger');
const paths = require('./paths');

const isDev = process.env.NODE_ENV === 'development';

const outputFileSass = `${paths.app.outputPath}/style.scss.css`;
const outputFile = `${paths.app.outputPath}/style.css`;

module.exports = {
  run: () => {
    mkdirp(paths.app.outputPath, () => {

      const sassCommand = `${paths.bin.sass} ${paths.app.indexCss} ${outputFileSass}`;
      const postCssCommand = `${paths.bin.postcss} --config ${paths.config.postcss} ${outputFileSass} -o ${outputFile}`;

      if (shell.exec(sassCommand).code === 0) {
        if (isDev) {
          parallel([
            () => shell.exec(`${sassCommand} -w`, { async: true }),
            () => shell.exec(`${postCssCommand} --watch`, { async: true })
          ]);
        } else {
          if (shell.exec(postCssCommand).code === 0) {
            logger.success('Compiled css successfully');
          } else {
            logger.error('postcss failed');
            logger.info(postCssCommand);
          }
        }
      } else {
        logger.error('sass compile failed');
        logger.info(sassCommand);
      }
    });
  }
}