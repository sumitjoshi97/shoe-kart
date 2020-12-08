import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'

import isEmpty from '~helpers/isEmpty'
import useCart from '~hooks/cart/useCart'

const CartIcon = () => {
  const { cart } = useCart()

  return (
    <div className="cart-icon">
      Cart
      <div className="cart-icon__container">
        <FiShoppingCart />
        {!isEmpty(cart) && cart.quantity > 0 && (
          <span className="cart-icon__container__count">{cart.quantity}</span>
        )}
      </div>
    </div>
  )
}

export default CartIcon
