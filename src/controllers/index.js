import UsersController from './users-controller'
import SessionsController from './sessions-controller'
import ProductsController from './products-controller'

const controllers = {
  users: UsersController,
  sign_in: SessionsController,
  products: ProductsController,
}

export default controllers