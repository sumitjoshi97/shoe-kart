import Product from '../../../../db/models/Product'
import User from '../../../../db/models/User'

const Cart = {
	items: async cart => {
		const items = cart.items.map(item => {
			const _id = item._id
			const product = Product.findById(item.product)
			const quantity = item.quantity
			const selectedSize = item.selectedSize
			return { _id, product, quantity, selectedSize }
		})
		return items
	},

	user: async cart => {
		const user = await User.findById(cart.user)
		return user
	},
}

export default Cart
