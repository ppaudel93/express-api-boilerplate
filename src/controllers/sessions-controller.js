import { Router } from 'express'
import { encode } from '../utils/jwt-parser'
import bcrypt from 'bcrypt'

const route = Router()

route.get('/', async (req, res) => {
  const { query: { email, password } } = req
  const user = await User.findOne({ $or: [{ email }, { username: email }] })
  if (!user || !bcrypt.compareSync(password, user?.password)) {
    res.status(401).jsonp({ error: 'User not found or password incorrect.' })
    return
  }
  const { username } = user
  const token = encode({ username, email, exp: Math.floor(Date.now() / 1000) + (3600 * 24 * 30) })
  res.setHeader('Set-Cookie', [`login_token=${token}; Expires=${new Date(Date.now() + (3600 * 24 * 30 * 1000))}; HttpOnly`])
  res.status(200).json({ message: 'successful', data: { user: { email, username, name: user.name } } })
})

export default route