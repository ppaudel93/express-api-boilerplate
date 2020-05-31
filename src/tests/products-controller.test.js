import 'regenerator-runtime'
import request from 'supertest'
import app from '../app'
import { setUpDatabase, tearDownDatabase, createUserAndLogin } from './utils'
import { User, Product } from '../models'

let loginCookie = ''
const DUMMY_PRODUCT = { name: 'Macbook Pro', price: 300000, qty: 300 }
const PRODUCT_LIST = [
  { name: 'Macbook Air', price: 218000, qty: 250 },
  { name: 'iPhone 11', price: 110000, qty: 200 },
  { name: 'iPhone 11 Pro', price: 150000, qty: 150 }
]

beforeAll(async () => {
  await setUpDatabase()
  loginCookie = await createUserAndLogin()
})

afterAll(async () => {
  await tearDownDatabase()
})

describe('Product test', () => {
  it('should create a new product', async done => {
    const numberOfProductsBefore = await Product.find().countDocuments()
    const product = await request(app).post('/products')
      .send(DUMMY_PRODUCT)
      .set('cookie', loginCookie)
      .expect(200)
    const { body: { data }} = product
    const numberOfProductsAfter = await Product.find().countDocuments()
    expect(numberOfProductsAfter).toBe(numberOfProductsBefore + 1)
    expect(data.name).toBe(DUMMY_PRODUCT.name)
    expect(data.qty).toBe(DUMMY_PRODUCT.qty)
    expect(data.price).toBe(DUMMY_PRODUCT.price)
    expect(data._id).toBeTruthy()
    expect(data.createdBy).toBeTruthy()
    done()
  })

  it('should return a list of products', async done => {
    let user = await User.findOne()
    PRODUCT_LIST.forEach(async prod => {
      let product = new Product(prod)
      product.createdBy = user._id
      await product.save()
      user.products.push(product._id)
    })
    await user.save()
    const response = await request(app).get('/products')
      .set('cookie', loginCookie)
      .expect(200)
    const { body: { data } } = response
    expect(Array.isArray(data)).toBe(true)
    done()
  })

  it('should return a single product', async done => {
    let product = await Product.findOne()
    const response = await request(app)
      .get(`/products/${product._id}`)
      .set('cookie', loginCookie)
      .expect(200)
    const { body: { data } } = response
    expect(typeof data).toBe('object')
    expect(data.name).toBe(product.name)
    expect(data.qty).toBe(product.qty)
    expect(data.price).toBe(product.price)
    expect(data._id).toBe(product._id.toString())
    expect(typeof data.createdBy).toBe('object')
    expect(data.createdBy.name).not.toBeFalsy()
    done()
  })
})