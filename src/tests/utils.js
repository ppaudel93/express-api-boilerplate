import mongoose from 'mongoose'
import app from '../app'
import request from 'supertest'

const DB_NAME = 'express_boilerplate_test'
const DUMMY_USER = { email: 'ram@test.com', password: 'password', username: 'ram', name: 'Ram' }

export const setUpDatabase = async () => {
  const url = `mongodb://127.0.0.1/${DB_NAME}`
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
}

export const tearDownDatabase = async () => {
  await mongoose.connection.dropDatabase()
}

export const createUserAndLogin = async () => {
  await createUser()
  let loginCookie = ''
  await request(app).get('/sign_in').query(DUMMY_USER).then(res => {
    loginCookie = res.header['set-cookie']
  })
  return loginCookie
}

export const createUser = async () => {
  await request(app).post('/users').send(DUMMY_USER)
}