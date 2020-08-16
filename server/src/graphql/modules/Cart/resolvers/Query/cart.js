import Cart from '../../../../../db/models/Cart'

async function cart(_, __, { user }) {
	try {
		const cart = await Cart.findOne({ user: user.userId })

		if (cart) {
			return cart
		}

		cart = new Cart({ user: user.userId, items: [] })
		return cart
	} catch (err) {
		throw new Error('something wrong happened try again')
	}
}

export default cart
