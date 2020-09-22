import Order from '../../../../../db/models/Order'
import Cart from '../../../../../db/models/Cart'

async function createOrder(_, __, { user }) {
	try {
		const cart = await Cart.findOne({ user: user.userId })
		if (!cart && cart.items.length === 0) throw new Error('empty cart')

		const newOrder = new Order({
			user: user.userId,
			items: cart.items,
			price: cart.price,
			quantity: cart.quantity,
		})
		await newOrder.save()
		return newOrder
	} catch (err) {
		console.log(err)
		throw new Error('cant create order, check credentials')
	}
}

export default createOrder
