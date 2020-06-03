import Cart from '../../../../../db/models/Cart'

async function cart(_, __, { user }) {
	try {
		const cart = await Cart.findOne({ user: user.userId })
		//return cart items if cart exists
		if (cart) {
			return cart
		}
		//create new empty cart object if cart does not exist
		cart = new Cart({ user: user.userId, items: [] })
		return cart
	} catch (err) {
		throw new Error('something wrong happened try again')
	}
}

export default cart
