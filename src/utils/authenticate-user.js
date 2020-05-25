import { decode } from './jwt-parser'
import { User } from '../models'

const authenticateUser = async loginToken => {
  const data = decode(loginToken)
  const user = await User.findOne({ username: data.data.username })
  global.currentUser = user
  return data
}

export default authenticateUser