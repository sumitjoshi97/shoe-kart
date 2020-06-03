import Cart from '../../../../../db/models/Cart'

async function removeFromCart(_, args, { user }) {
	try {
		const cart = await Cart.findOne({ user: user.userId })
		const cartItem = cart.items.find(
			item => item._id.toString() === args.cartItemId
		)

		if (!cart && !cartItem) throw new Error()

		const updatedCart = await Cart.findOneAndUpdate(
			{ user: user.userId },
			{ $pull: { items: { _id: args.cartItemId } } },
			{ new: true }
		)
		return updatedCart
	} catch (err) {
		throw new Error('cant remove item from cart, try again')
	}
}

export default removeFromCart
