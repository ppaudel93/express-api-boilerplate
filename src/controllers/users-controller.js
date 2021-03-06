
import { Router } from 'express'
import bcrypt from 'bcrypt'

const route = Router()

// middleware example
// route.use((_req, _res, next) => {
//   console.log(`${chalk.blue('Time:')} ${chalk.red(new Date())}`)
//   next()
// })

route.post('/', (req, res) => {
  const { body } = req
  const user = new User(body)
  const salt = bcrypt.genSaltSync(14)
  const encryptedPassword = bcrypt.hashSync(body.password, salt)
  user.password = encryptedPassword
  user.save().then(() => {
    res.status(200).jsonp({ data: user })
  }).catch(err => {
    console.log(chalk.bold.red(err))
    res.status(422).jsonp(err)
  })
})

export default route
