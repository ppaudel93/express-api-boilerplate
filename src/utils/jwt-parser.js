import jwt from 'jsonwebtoken'
import fs from 'fs'
import rootDir from 'app-root-path'

const secretKey = fs.readFileSync(`${rootDir.path}/src/config/jwt_secret_key.yml`, 'utf8')

export const encode = data => {
  const token = jwt.sign(data, secretKey, { algorithm: 'HS256' })
  return token
}

export const decode = token => {
  try {
    const decodedData = jwt.verify(token, secretKey)
    return { data: decodedData, type: 'success' }
  }
  catch(err) {
    return { error: err, type: 'error' }
  }
}
