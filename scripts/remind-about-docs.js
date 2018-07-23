/**
 * Friendy reminder for publishing docs.
 *
 * Why not just add the `docs publish` to lerna:publish?
 * 1. because then there wouldn't be such a nice eye catcher
 * 2. because it's not part of the routine -
 * when working on a feature one often publishes multiple alpha versions
 * and one does not want to publish the docs.
 * And creating a `lerna:publish` without docs would be irritating.
 */
process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

const logger = require('../helpers/logger')

logger.eyeCatch('--------------------------------------------------------')
logger.eyeCatch(' Friendly Reminder: Did you publish the stylemark docs? ')
logger.eyeCatch('--------------------------------------------------------')
