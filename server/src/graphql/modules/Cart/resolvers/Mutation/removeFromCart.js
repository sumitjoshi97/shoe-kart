import Cart from '../../../../../db/models/Cart'
import Product from '../../../../../db/models/Product'

async function removeFromCart(_, args, { user }) {
  try {
    const cart = await Cart.findOne({ user: user.userId })
    const isProductInCart = cart.items.find(
      item => item.product.toString() === args.productId
    )
    const product = await Product.findById(args.productId)

    if (product && cart && isProductInCart) {
      const updatedCart = await Cart.findOneAndUpdate(
        { user: user.userId },
        { $pull: { items: { product: args.productId } } },
        { new: true }
      )
      return updatedCart
    }
  } catch (err) {
    throw new Error('cant remove product from cart, try again')
  }
}

export default removeFromCart
