import Cart from '../../../../../db/models/Cart'

async function clearCart(_, args, { user }) {
	try {
		const cart = await Cart.findOne({ user: user.userId })
		cart.items = []
		const updatedCart = cart.save()
		return updatedCart
	} catch (err) {
		throw new Error('error occured')
	}
}

export default clearCart
