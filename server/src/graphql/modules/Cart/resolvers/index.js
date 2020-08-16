import Cart from './Cart'
import CartItem from './CartItem'
import Category from '../../Category/resolvers/Category'
import Product from '../../Product/resolvers/Product'
import * as Mutation from './Mutation'
import * as Query from './Query'

const resolvers = {
	Cart,
	CartItem,
	Product,
	Category,
	Query,
	Mutation,
}

export default resolvers
