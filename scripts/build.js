process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
process.env.FORCE_COLOR = 1;

const config = require('../.config/webpack.config');
const webpack = require('../.config/webpack');
const sass = require('../.config/sass');


// build js
webpack.run(config);

// build css
sass.run();