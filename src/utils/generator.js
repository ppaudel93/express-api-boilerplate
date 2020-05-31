import fs from 'fs'
import { camelCase, upperFirst, lowerCase } from 'lodash'
import pluralize from 'pluralize'
import chalk from 'chalk'

const GENERATABLE_TYPES = ['model', 'controller']

const TYPE_TO_FILES = {
  model: ['model', 'controller', 'test'],
  controller: ['controller', 'test'],
}

const filename = (name, type) => {
  switch(type) {
    case GENERATABLE_TYPES[0]:
      return name
    case GENERATABLE_TYPES[1]:
      return `${lowerCase(pluralize(name))}-controller`
    case 'test':
      return `${lowerCase(pluralize(name))}-controller.test`
    default:
      return `${lowerCase(pluralize(name))}-${type}`
  }
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

const controllerTemplate = () => `
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

const testTemplate = () => `
import 'regenerator-runtime'
import request from 'supertest'
import app from '../app'
import { setUpDatabase, tearDownDatabase, createUserAndLogin } from './utils'

let loginCookie = ''

beforeAll(async () => {
  await setUpDatabase()
  loginCookie = await createUserAndLogin()
})

afterAll(async () => {
  await tearDownDatabase()
})
`

const templateMapper = {
  model: modelTemplate,
  controller: controllerTemplate,
  test: testTemplate
}

if (!canFileBeGenerated(args[0]))
  throw `${args[0]} cannot be generated`

for (let i = 1; i < args.length; i++) {
  TYPE_TO_FILES[args[0]].forEach(fileType => {
    fs.writeFile(
      `./src/${pluralize(fileType)}/${filename(args[i], fileType)}.js`,
      templateMapper[fileType](filename(args[i], fileType)),
      function (err) {
        if (err) throw err
      }
    )
  })
  console.log(chalk.bold.green('files generated successfully'))
}