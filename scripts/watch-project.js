/**
 * Script for watching docs & watching a given package
 */
process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

const fs = require('fs')
const parallel = require('run-parallel')
const shell = require('shelljs')
const ow = require('ow')
const logger = require('../helpers/logger');

// 0 = node, 1 = watch-projects.js, 2 = projectName
const project = process.argv[2]

ow(project, ow.string.label('project').not.empty)

const path = `packages/${project}`

if(!fs.existsSync(path + '/package.json')) {
  logger.error('feature does not exist searched in ' + path)
  logger.info('make sure the folder exists and contains a package.json')
  process.exit(1)
}

// This could be optimized by calling docs only after yarn:watch has compiled
parallel([
  () => {
    // watch docs
    shell.exec('yarn docs:watch', { async: true })
  },
  () => {
    // watch project
    shell.exec(`cd ${path} && yarn watch`, { async: true })
  }
])
