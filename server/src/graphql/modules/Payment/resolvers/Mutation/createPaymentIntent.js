import Cart from '../../../../../db/models/Cart'
import User from '../../../../../db/models/User'
import { stripe } from '../../../../../utils/stripe'

async function getUserPaymentId(userId) {
	const user = await User.findById(userId)
	if (!user.paymentId) {
		const customer = await stripe.customers.create()
		user.paymentId = customer.id
		await user.save()

		return customer.id
	}
	return user.paymentId
}

async function createPaymentIntent(_, __, { user }) {
	try {
		const cart = await Cart.findOne({ user: user.userId })
		if (!cart && cart.items.length === 0) throw new Error('cart empty')

		const paymentIntent = await stripe.paymentIntents.create({
			customer: await getUserPaymentId(user.userId),
			setup_future_usage: 'off_session',
			amount: cart.price * 100,
			currency: 'inr',
		})

		return { id: paymentIntent.id, clientSecret: paymentIntent.client_secret }
	} catch (err) {
		console.log(err)
		throw new Error('payment intent cannot be processed try again')
	}
}

export default createPaymentIntent
