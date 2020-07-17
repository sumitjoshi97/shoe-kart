import Cart from '../../../../../db/models/Cart'
import Product from '../../../../../db/models/Product'

async function removeFromCart(_, args, { user }) {
	try {
		const cart = await Cart.findOne({ user: user.userId })
		const cartItem = cart.items.find(
			item => item._id.toString() === args.cartItemId
		)
		const product = await Product.findById(cartItem.product)

		if (!cart && !cartItem && !product) throw new Error()

		const updatedCart = await Cart.findOneAndUpdate(
			{ user: user.userId },
			{
				$set: {
					price: cart.price - product.price * cartItem.quantity,
					quantity: cart.quantity - cartItem.quantity,
				},
				$pull: { items: { _id: args.cartItemId } },
			},
			{ new: true }
		)
		return updatedCart
	} catch (err) {
		console.log(err)
		throw new Error('cant remove item from cart, try again')
	}
}

export default removeFromCart
