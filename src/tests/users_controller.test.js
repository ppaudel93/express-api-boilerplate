import mongoose from 'mongoose'
import chalk from 'chalk'
import 'regenerator-runtime'
import request from 'supertest'
import app from '../app'

const DB_NAME = 'test'
const DUMMY_USER = { email: 'ram@test.com', password: 'password', username: 'ram', name: 'Ram' }

beforeEach(async () => {
  console.log(chalk.green('cleaning up old database'))
  await mongoose.connection.dropDatabase()
  console.log(chalk.green('creating test database'))
  const url = `mongodb://127.0.0.1/${DB_NAME}`
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
})

afterEach(async () => {
  console.log(chalk.green('dropping database'))
  mongoose.connection.dropDatabase()
})

describe('User creation test', () => {
  it('should create a new user', async done => {
    await request(app).post('/users')
      .send(DUMMY_USER)
      .expect(200)
    done()
  })
})