var fs = require('fs');
const mkdirp = require('mkdirp');
const shell = require('shelljs');
const ncp = require('ncp');
const replace = require('replace-in-file');
const upperCamelCase = require('uppercamelcase');
const paths = require('../.config/paths');
const logger = require('../helpers/logger');
var argv = require('minimist')(process.argv.slice(2));

const libName = argv.name;

const libPath = paths.packages.entry + '/' + libName;

var fs = require('fs');
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
          logger.success('created lib');
        }).catch((error) => {
          logger.error('failed to replace in package.json');
          console.log(error);
        })
      }
    });
  });
}
