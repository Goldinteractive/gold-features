const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const packageJson = require(resolveApp('package.json'));
const libNameSplit = packageJson.name.split('/');
const libName = libNameSplit[libNameSplit.length - 1];

const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath);
const resolveBin = relativePath => path.resolve(resolveOwn('node_modules/.bin'), relativePath);

module.exports = {
  names: {
    lib: 'lib',
    libName,
    outputName: '/main.min.js',
    assets: 'assets/features'
  },
  global: {
    docs: resolveOwn('docs')
  },
  app: {
    entry: appDirectory,
    indexJs: resolveApp('src/index'),
    indexCss: resolveApp('src/style.scss'),
    assets: resolveApp('assets'),
    outputPath: resolveApp('lib'),
    nodeModules: resolveApp('node_modules')
  },
  packages: {
    entry: resolveOwn('packages')
  },
  helpers: {
    skeleton: resolveOwn('helpers/skeleton')
  },
  config: {
    postcss: resolveOwn('.config/postcss.config.js')
  },
  bin: {
    postcss: resolveBin('postcss'),
    sass: resolveBin('sass')
  }
}
