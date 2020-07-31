import Order from '../../../../../db/models/Order'
import Cart from '../../../../../db/models/Cart'
import User from '../../../../../db/models/User'
import { stripe } from '../../../../../utils/stripe'

async function getCustomerPaymentId(user, source) {
	if (!user.paymentId) {
		const customer = await stripe.customers.create({
			email: user.email,
			source,
			name: user.name,
		})

		user.paymentId = customer.id
		await user.save()
		return customer.id
	}

	return user.paymentId
}

async function createOrder(_, { token }, { user }) {
	try {
		const cart = await Cart.findOne({ user: user.userId })
		const currentUser = await User.findById(user.userId)

		if (!cart && cart.items.length === 0) throw new Error('empty cart')

		const charge = await stripe.charges.create({
			amount: cart.price * 100,
			currency: 'inr',
			description: 'items bought',
			customer: await getCustomerPaymentId(currentUser, token),
		})

		if (!charge) {
			throw new Error('payment unsuccessful try again')
		}

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
