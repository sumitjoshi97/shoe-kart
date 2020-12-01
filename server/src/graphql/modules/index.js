import Auth from './Auth'
import Cart from './Cart'
import Category from './Category'
import Order from './Order'
import Product from './Product'
import UserInfo from './UserInfo'
import Payment from './Payment'

import makeExecutableSchemaFromModules from '../../utils/modules'

const schema = makeExecutableSchemaFromModules({
	modules: [Auth, Cart, Category, Order, Payment, Product, UserInfo],
})

export default schema
