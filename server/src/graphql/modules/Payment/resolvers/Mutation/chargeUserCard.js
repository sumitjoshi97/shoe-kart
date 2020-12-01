import Cart from '../../../../../db/models/Cart'
import User from '../../../../../db/models/User'
import { stripe } from '../../../../../utils/stripe'

async function chargeUserCard(_, { paymentMethod }, { user }) {
	try {
		const currentUser = await User.findById(user.userId)
		const cart = await Cart.findOne({ user: user.userId })
		if (!cart && cart.items.length === 0) throw new Error('cart empty')

		const paymentIntent = await stripe.paymentIntents.create({
			amount: cart.price * 100,
			currency: 'inr',
			customer: currentUser.paymentId,
			payment_method: paymentMethod,
			off_session: true,
			confirm: true,
		})
		return { id: paymentIntent.id, clientSecret: paymentIntent.client_secret }
	} catch (err) {
		throw new Error('payment cannot be processed try again')
	}
}

export default chargeUserCard
