import User from '../../../../../db/models/User'
import { stripe } from '../../../../../utils/stripe'

async function paymentMethods(_, __, { user }) {
	try {
		const currentUser = await User.findById(user.userId)

		if (!currentUser.paymentId) throw new Error()

		const savedPaymentMethods = await stripe.paymentMethods.list({
			customer: currentUser.paymentId,
			type: 'card',
		})

		const paymentMethods = savedPaymentMethods.data.map(paymentMethod => {
			const {
				id,
				card: { brand, exp_month, exp_year, fingerprint, funding, last4 },
			} = paymentMethod

			return {
				id,
				card: {
					brand,
					expMonth: exp_month,
					expYear: exp_year,
					fingerprint,
					funding,
					lastDigits: last4,
				},
			}
		})

		return paymentMethods
	} catch (err) {
		throw new Error('no payment methods saved')
	}
}

export default paymentMethods
