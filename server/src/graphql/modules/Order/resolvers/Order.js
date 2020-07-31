import Product from '../../../../db/models/Product'
import User from '../../../../db/models/User'
import UserInfo from '../../../../db/models/UserInfo'

const Order = {
	items: async order => {
		const items = order.items.map(item => {
			const _id = item._id
			const product = Product.findById(item.product)
			const quantity = item.quantity
			const selectedSize = item.selectedSize
			return { _id, product, quantity, selectedSize }
		})
		return items
	},

	user: async order => {
		const user = await User.findById(order.user)
		return user
	},
	userInfo: async order => {
		const userInfo = await UserInfo.findOne({ user: order.user })
		return userInfo
	},
}

export default Order
