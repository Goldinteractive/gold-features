/*
 * Script for bootstraping a new feature
 */
const fs = require('fs');
const mkdirp = require('mkdirp');
const shell = require('shelljs');
const ncp = require('ncp');
const replace = require('replace-in-file');
const upperCamelCase = require('uppercamelcase');
const paths = require('../.config/paths');
const logger = require('../helpers/logger');
const argv = require('minimist')(process.argv.slice(2));

const libName = argv.name;

const libPath = paths.packages.entry + '/' + libName;

if (fs.existsSync(libPath)) {
  logger.error(`Path for ${libName} already exsists`);
} else {
  mkdirp(libPath, () => {
    ncp(paths.helpers.skeleton, libPath, (err) => {
      if (err) {
        logger.error('could not copy skeleton');
        console.log(err);
      } else {
        replace({
          files: libPath + '/**',
          from: /\${FEATURE_NAME}/g,
          to: libName
        }).then(() => {
          return replace({
            files: libPath + '/**',
            from: /\${FEATURE_NAME_CAMEL}/g,
            to: upperCamelCase(libName)
          });
        }).then(() => {
          const assetFolder = libPath + '/' + paths.names.assets + '/' + libName;
          mkdirp(assetFolder, () => {
            fs.writeFile(assetFolder + '/.gitkeep', '', function(err) {
              if (err) {
                logger.error('failed to create .gitkeep for asset folder');
                console.log(err);
              } else {
                logger.success('created lib');
              }
            });
          });
        }).catch((error) => {
          logger.error('failed to replace in package.json');
          console.log(error);
        })
      }
    });
  });
}
