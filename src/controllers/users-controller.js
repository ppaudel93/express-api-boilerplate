
import { Router } from 'express'

const route = Router()

route.use((_req, _res, next) => {
  console.log(`${chalk.blue('Time:')} ${chalk.red(new Date())}`)
  next()
})

route.post('/', (req, res) => {
  const { body } = req
  const User = models.User
  const user = new User(body)
  user.save().then(() => {
    console.log(chalk.green('User created'))
    res.status(200).jsonp({ data: user })
  }).catch(err => {
    console.log(chalk.red(err))
    res.status(422).jsonp(err)
  })
})

export default route
