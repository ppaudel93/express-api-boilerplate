import mongoose from 'mongoose'
import chalk from 'chalk'
import 'regenerator-runtime'
import request from 'supertest'
import app from '../app'

const DB_NAME = 'test'
const DUMMY_USER = { email: 'ram@test.com', password: 'password', username: 'ram', name: 'Ram' }
let cookieHeaders = {}

beforeEach(async () => {
  console.log(chalk.green('cleaning up old database'))
  await mongoose.connection.dropDatabase()
  console.log(chalk.green('creating test database'))
  const url = `mongodb://127.0.0.1/${DB_NAME}`
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  await request(app).post('/users').send(DUMMY_USER)
  await request(app).get('/sign_in').query(DUMMY_USER).then(res => {
    cookieHeaders = { 'set-cookie': res.header['set-cookie'] }
  })
})

afterEach(async () => {
  console.log(chalk.green('dropping database'))
  mongoose.connection.dropDatabase()
})

describe('Product test', () => {
  console.log(cookieHeaders)
  it('should create a new product', async done => {
    await request(app).post('/products')
      .send({ name: 'Macbook Pro', price: 300000, qty: 300 })
      .set('cookie', cookieHeaders['set-cookie'])
      .expect(200)
    done()
  })
})