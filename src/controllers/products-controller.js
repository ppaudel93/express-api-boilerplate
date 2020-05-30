import { Router } from 'express'
import authenticateUser from '../utils/authenticate-user'

const route = Router()

route.use(async (req, res, next) => {
  const authenticator = await authenticateUser(req.cookies.login_token)
  if (authenticator.type === 'success') {
    next()
  } else {
    res.status(401).jsonp({ error: 'not logged in' })
  }
})

route.post('/', (req, res) => {
  const { body } = req
  const product = new Product(body)
  product.createdBy = currentUser._id
  product.save().then(async () => {
    currentUser.products.push(product)
    await currentUser.save()
    res.status(200).jsonp({ data: product.populate('createdBy') })
  }).catch(err => {
    console.log(chalk.bold.red(err))
    res.status(422).jsonp(err)
  })
})

route.get('/', async (_req, res) => {
  const products = await Product.find()
  res.status(200).jsonp({ data: serializeIndex(products) })
})

route.get('/:id', async (req, res) => {
  const { id } = req.params
  const product = await Product.findOne({ _id: id }).populate('createdBy', '_id, name')
  res.status(200).jsonp({ data: await serializeShow(product) })
})

const serializeIndex = products => {
  return products.map(product => ({
    _id: product._id,
    qty: product.qty,
    price: product.qty,
    name: product.name,
    createdAt: product.createdAt
  }))
}

const serializeShow = async ({ _id, qty, price, name, createdAt, createdBy }) => ({
  _id,
  qty,
  price,
  name,
  createdAt,
  createdBy
})

export default route