import 'regenerator-runtime'
import request from 'supertest'
import { setUpDatabase, tearDownDatabase, createUser } from './utils'
import app from '../app'
import { decode } from '../utils/jwt-parser'

const DUMMY_USER = { email: 'ram@test.com', password: 'password', username: 'ram', name: 'Ram' }

beforeAll(async () => {
  await setUpDatabase()
  await createUser()
})

afterAll(async () => {
  await tearDownDatabase()
})

describe('User login test', () => {
  it('should login to the user\'s account', async done => {
    const response = await request(app)
      .get('/sign_in')
      .query({ email: DUMMY_USER.email, password: DUMMY_USER.password })
      .expect(200)
      expect(response.header['set-cookie']).toBeTruthy()
      let loginToken = response.header['set-cookie'][0]
      loginToken = loginToken.split('login_token=')[1].split(';')[0]
      const decodedData = decode(loginToken)
      expect(decodedData.type).toBe('success')
      expect(decodedData.data.username).toBe(DUMMY_USER.username)
      expect(decodedData.data.email).toBe(DUMMY_USER.email)
    done()
  })

  it('should not login to the user\'s account', async done => {
    const response = await request(app)
      .get('/sign_in')
      .query({ email: DUMMY_USER.email, password: 'incorrect_password' })
      .expect(401)
    expect(response.error).toBeTruthy()
    done()
  })
})