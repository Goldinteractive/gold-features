var fs = require('fs');
const mkdirp = require('mkdirp');

mkdirp('lib', () => {
  fs.createReadStream('node_modules/@goldinteractive/js-base/lib/base.js').pipe(fs.createWriteStream('lib/base.js'));
  fs.createReadStream('node_modules/requirejs/require.js').pipe(fs.createWriteStream('lib/require.js'));
  fs.createReadStream('node_modules/intersection-observer/intersection-observer.js').pipe(fs.createWriteStream('lib/intersection-observer.js'));
});
