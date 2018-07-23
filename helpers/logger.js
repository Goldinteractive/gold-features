const chalk = require('chalk');

module.exports = {
  success: msg => console.log(chalk.green(msg)),
  info: msg => console.log(chalk.white(msg)),
  warn: msg => console.log(chalk.keyword('orange')(msg)),
  error: msg => console.log(chalk.bold.red(msg)),
  eyeCatch: msg => console.log(chalk.white.bgBlue.bold(msg))
}
