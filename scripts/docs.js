var fs = require('fs');
const mkdirp = require('mkdirp');
const shell = require('shelljs');
const paths = require('../.config/paths');

shell.exec(`rm -r ${paths.global.docs}`)
mkdirp(paths.global.docs, () => {
  fs.createReadStream('.nojekyll').pipe(fs.createWriteStream('docs/.nojekyll'));
});
