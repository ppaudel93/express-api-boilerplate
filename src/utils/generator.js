import fs from 'fs'
import { kebabCase, camelCase, upperFirst } from 'lodash'
import pluralize from 'pluralize'

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
import Model from './Model'

export default class ${upperFirst(camelCase(className))} extends Model {
  constructor(params = {}) {
    super(params)
  }
}
`

const controllerTemplate = className => `
import Controller from './controller'

export default class ${upperFirst(camelCase(className))} extends Controller {
  constructor(params = {}) {
    super(params)
  }

}
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
            console.log(`${args[i]} controller generated successfully`)
          }
        )
      console.log(`${args[i]} ${args[0]} generated successfully`)
    }
  )
}