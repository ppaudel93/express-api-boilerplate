import repl from 'repl'
import chalk from 'chalk'
import * as models from '../models'
import connectToDb from '../utils/connect-to-db'

connectToDb()

Object.keys(models).forEach(modelName => {
  global[modelName] = models[modelName]
})
global.chalk = chalk

console.log(chalk.green('Console started!'))
const replServer = repl.start({ useColors: true, prompt: 'app > ' })

replServer.context.db = models

replServer.on('exit', () => {
  console.log(chalk.red('Stopping console..'))
  process.exit()
})