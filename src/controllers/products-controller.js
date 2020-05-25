import { Router } from 'express'
import authenticateUser from '../utils/authenticate-user'

const route = Router()

route.use(async (req, res, next) => {
  const authenticator = await authenticateUser(req.cookies.login_token, res)
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
    console.log(chalk.green('Product created'))
    res.status(200).jsonp({ data: product.populate('createdBy') })
  }).catch(err => {
    console.log(chalk.red(err))
    res.status(422).jsonp(err)
  })
})

route.get('/', async (_req, res) => {
  const products = await Product.find()
  res.status(200).jsonp(serializeIndex(products))
})

route.get('/:id', async (req, res) => {
  const { id } = req.params
  product = await Product.findOne({ id })
  res.status(200).jsonp(product)
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

export default route