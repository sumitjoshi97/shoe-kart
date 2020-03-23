import Cart from '../../../../../db/models/Cart'
import Product from '../../../../../db/models/Product'

function getQuantity(cartAction, productQuantity, inputQuantity) {
  let quantity

  switch (cartAction) {
    case 'ADD':
      quantity = productQuantity + 1
      return quantity

    case 'DELETE':
      quantity = productQuantity - 1
      return quantity

    case 'QUANTITY':
      quantity = inputQuantity || productQuantity
      return quantity

    default:
      return productQuantity
  }
}

async function updateCart(_, args, { user }) {
  try {
    const cart = await Cart.findOne({ user: user.userId })
    const product = await Product.findById(args.productId)

    if (product && cart) {
      const isProductInCart = cart.items.find(
        item => item.product.toString() === args.productId
      )

      if (isProductInCart) {
        const newItemQuantity = getQuantity(
          args.action,
          isProductInCart.quantity,
          args.quantity
        )
        if (newItemQuantity && newItemQuantity > 0) {
          isProductInCart.quantity = newItemQuantity
          const updatedCart = await cart.save()
          return updatedCart
        } else {
          return new Error('invalid product quantity')
        }
      } else {
        throw new Error('product is not in cart')
      }
    } else {
      throw new Error('selected product is not available')
    }
  } catch (err) {
    throw new Error(err)
  }
}

export default updateCart
