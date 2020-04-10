import express from 'express'
import * as models from './models'
import chalk from 'chalk'
import controllers from './controllers'
import connectToDb from './utils/connect-to-db'
import { defaultSchema } from './models/Model'
import bodyParser from 'body-parser'

connectToDb()

const app = express()
const port = 3000

global.defaultSchema = defaultSchema
global.models = models
global.chalk = chalk

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

for (const [key, controller] of Object.entries(controllers)) {
  app.use(`/${key}`, controller)
}

app.listen(port, () => console.log(`Server started on port ${port}!`))