import 'regenerator-runtime'
import request from 'supertest'
import app from '../app'
import { setUpDatabase, tearDownDatabase } from './utils'
import { User } from '../models'

const DUMMY_USER = { email: 'ram@test.com', password: 'password', username: 'ram', name: 'Ram' }

beforeAll(async () => {
  await setUpDatabase()
})

afterAll(async () => {
  await tearDownDatabase()
})

describe('User creation test', () => {
  it('should create a new user', async done => {
    const numberOfUsersBefore = await User.find().countDocuments()
    const response = await request(app).post('/users')
      .send(DUMMY_USER)
      .expect(200)
    const { body: { data }} = response
    const numberOfUsersAfter = await User.find().countDocuments()
    expect(numberOfUsersAfter).toBe(numberOfUsersBefore + 1)
    expect(data.username).toBe(DUMMY_USER.username)
    expect(data.name).toBe(DUMMY_USER.name)
    expect(data.email).toBe(DUMMY_USER.email)
    done()
  })
})