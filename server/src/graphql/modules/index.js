import Auth from './Auth'
import Cart from './Cart'
import Order from './Order'
import Product from './Product'
import UserInfo from './UserInfo'

import makeExecutableSchemaFromModules from '../../utils/modules'

const schema = makeExecutableSchemaFromModules({
  modules: [Auth, Cart, Order, Product, UserInfo],
})

export default schema
