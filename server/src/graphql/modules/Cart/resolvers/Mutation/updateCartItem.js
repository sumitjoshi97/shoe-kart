import Cart from '../../../../../db/models/Cart'
import Product from '../../../../../db/models/Product'

async function updateCartItem(
	_,
	{ cartItemId, quantity, selectedSize },
	{ user }
) {
	try {
		const cart = await Cart.findOne({ user: user.userId })

		if (cart) {
			const cartItem = await cart.items.find(
				item => item._id.toString() === cartItemId
			)
			const product = await Product.findById(cartItem.product)

			if (!cartItem) throw new Error()
			cart.quantity += quantity - cartItem.quantity
			cart.price += (quantity - cartItem.quantity) * product.price
			cartItem.quantity = quantity
			cartItem.selectedSize = selectedSize

			const updatedCart = await cart.save()
			return updatedCart
		}
	} catch (err) {
		throw new Error('invalid cart')
	}
}

export default updateCartItem
