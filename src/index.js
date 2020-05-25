import express from 'express'
import * as models from './models'
import chalk from 'chalk'
import controllers from './controllers'
import connectToDb from './utils/connect-to-db'
import { defaultSchema } from './models/_default'
import bodyParser from 'body-parser'
import authenticateUser from './utils/authenticate-user'
import cookieParser from 'cookie-parser'

connectToDb()

const app = express()
const port = 3000

global.defaultSchema = defaultSchema
for (const [key, model] of Object.entries(models)) {
  global[key] = model
}
global.chalk = chalk
global.authenticateUser = authenticateUser

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

for (const [key, controller] of Object.entries(controllers)) {
  app.use(`/${key}`, controller)
}

app.listen(port, () => console.log(`Server started on port ${port}!`))