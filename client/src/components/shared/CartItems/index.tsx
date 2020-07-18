import React from 'react'
import Title from '../Title'
import isEmpty from '~helpers/isEmpty'
import { ICartItem } from './interface'
import withCart from '~hocs/cart/withCart'
import CartItem from './CartItem'
import './styles.scss'

const CartItems = (props: any) => {
  const handleCartItemUpdate = (
    cartItemId: string,
    quantity: number,
    selectedSize: number,
  ) => {
    props.updateCartItem(cartItemId, quantity, selectedSize)
  }

  const handleRemoveCartItem = (cartItemId: string) => {
    props.removeItemFromCart(cartItemId)
  }

  const renderCartItems = () => {
    if (!isEmpty(props.cart.items)) {
      return props.cart.items.map((cartItem: ICartItem) => (
        <CartItem
          key={cartItem._id}
          cartItem={cartItem}
          updateCartItem={handleCartItemUpdate}
          removeCartItem={handleRemoveCartItem}
        />
      ))
    }
  }

  return (
    <div className="cart-items">
      <Title title={props.header} />
      <div className="cart-items__list">{renderCartItems()}</div>
    </div>
  )
}

export default withCart(CartItems)
