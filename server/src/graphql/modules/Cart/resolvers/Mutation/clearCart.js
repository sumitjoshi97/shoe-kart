import Cart from '../../../../../db/models/Cart'

async function clearCart(_, args, { user }) {
	try {
		const cart = await Cart.findOne({ user: user.userId })
		cart.price = 0
		cart.quantity = 0
		cart.items = []

		const updatedCart = cart.save()
		return updatedCart
	} catch (err) {
		throw new Error('can"t clear the cart, try again')
	}
}

export default clearCart
