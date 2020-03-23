import Product from '../../../../db/models/Product'
import User from '../../../../db/models/User'

const Cart = {
  items: async (cart) => {
    const items = cart.items.map(item => {
      const product = Product.findById(item.product)
      const quantity = item.quantity
      const price = item.price
      return { product, quantity, price }
    })
    return items
  },

  user: async (cart) => {
    const user = await User.findById(cart.user)
    return user
  }
}

export default Cart