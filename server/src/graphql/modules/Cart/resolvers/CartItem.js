import Product from '../../../../db/models/Product'

const CartItem = {
	product: async cartItem => await Product.findById(cartItem.product),
}

export default CartItem
