import Cart from '../../../../../db/models/Cart'
import Product from '../../../../../db/models/Product'

async function addToCart(_, args, { user }) {
	try {
		const cart = await Cart.findOne({ user: user.userId })
		const product = await Product.findById(args.productId)

		if (product) {
			const newCartItem = {
				product: args.productId,
				quantity: 1,
				selectedSize: args.selectedSize,
			}
			if (cart) {
				cart.items.push(newCartItem)
				const updatedCart = await cart.save()
				return updatedCart
			}

			const newCart = await new Cart({
				user: user.userId,
				items: [newCartItem],
			}).save()
			return newCart
		} else {
			throw new Error('product not avaiable')
		}
	} catch (err) {
		console.log(err)
		throw new Error('error occured')
	}
}

export default addToCart
