import fs from 'fs'
import { kebabCase, camelCase, upperFirst } from 'lodash'
import pluralize from 'pluralize'
import chalk from 'chalk'

const GENERATABLE_TYPES = ['model', 'controller']

const filename = (name, type) => {
  if (type == GENERATABLE_TYPES[0])
    return name
  return kebabCase(
    `${pluralize(name)}_${type}`
    )
}

const args = process.argv.slice(2)

const canFileBeGenerated = type => {
  return GENERATABLE_TYPES.includes(type)
}

const modelTemplate = className => `
import mongoose from 'mongoose'
import { defaultSchema } from './_default'

const schema = new mongoose.Schema({
  name: { type: string, required: true, trim: true }
})

const ${upperFirst(camelCase(className))} = mongoose.model('${upperFirst(camelCase(className))}', schema)

export default ${upperFirst(camelCase(className))}
`

const controllerTemplate = className => `
import { Router } from 'express'
import authenticateUser from '../utils/authenticate-user'

const route = Router()

route.use(async (req, res, next) => {
  const authenticator = await authenticateUser(req.cookies.login_token)
  if (authenticator.type === 'success') {
    next()
  } else {
    res.status(401).jsonp({ error: 'not logged in' })
  }
})

route.get('/', (req, res) => {
  //index
})

route.get('/:id', (req, res) => {
  //show
})

route.post('/', (req, res) => {
  //create
})

export default route
`

const templateMapper = {
  model: modelTemplate,
  controller: controllerTemplate,
}

if (!canFileBeGenerated(args[0]))
  throw `${args[0]} cannot be generated`

for (let i = 1; i < args.length; i++) {
  fs.writeFile(
    `./src/${pluralize(args[0])}/${filename(args[i], args[0])}.js`,
    templateMapper[args[0]](filename(args[i], args[0])),
    function (err) {
      if (err) throw err
      if (args[0] == GENERATABLE_TYPES[0])
        fs.writeFile(
          `./src/controllers/${filename(args[i], 'controller')}.js`,
          templateMapper['controller'](filename(args[i], 'controller')),
          function (err) {
            if (err) throw err
            console.log(chalk.bold.green(`${args[i]} controller generated successfully`))
          }
        )
      console.log(chalk.bold.green(`${args[i]} ${args[0]} generated successfully`))
    }
  )
}