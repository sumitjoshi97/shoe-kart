import Cart from '../../../../../db/models/Cart'

async function updateCartItem(_, args, { user }) {
	try {
		const cart = await Cart.findOne({ user: user.userId })

		if (cart) {
			const cartItem = await cart.items.find(
				item => item._id.toString() === args.cartItemId
			)

			if (!cartItem) throw new Error()

			cartItem.quantity = args.quantity
			cartItem.selectedSize = args.selectedSize

			const updatedCart = await cart.save()
			return updatedCart
		}
	} catch (err) {
		throw new Error(err)
	}
}

export default updateCartItem
