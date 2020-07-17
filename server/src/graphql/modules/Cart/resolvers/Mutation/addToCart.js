import Cart from '../../../../../db/models/Cart'
import Product from '../../../../../db/models/Product'

async function addToCart(
	_,
	{ productId, quantity = 1, selectedSize },
	{ user }
) {
	try {
		const cart = await Cart.findOne({ user: user.userId })
		const product = await Product.findById(productId)

		if (product) {
			const newCartItem = {
				product: productId,
				quantity,
				selectedSize,
			}
			if (cart) {
				cart.items.push(newCartItem)
				cart.price += quantity * product.price
				cart.quantity += quantity

				const updatedCart = await cart.save()
				return updatedCart
			}

			const newCart = await new Cart({
				user: user.userId,
				price: product.price * quantity,
				quantity: quantity,
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
