import React from 'react'
import isEmpty from '~helpers/isEmpty'
import { ICartItem } from '~interface'
import CartItem from './CartItem'

export interface ICartItemsProps {
  cartItems: ICartItem[]
  updateCartItem: (
    cartItemId: string,
    quantity: number,
    selectedSize: string,
  ) => void
  removeItemFromCart: (cartItemId: string) => void
}

const CartItems: React.FC<ICartItemsProps> = ({ cartItems, ...props }) => {
  const handleCartItemUpdate = (
    cartItemId: string,
    quantity: number,
    selectedSize: string,
  ) => {
    props.updateCartItem(cartItemId, quantity, selectedSize)
  }

  const handleRemoveCartItem = (cartItemId: string) => {
    props.removeItemFromCart(cartItemId)
  }

  const renderCartItems = () => {
    if (!isEmpty(cartItems)) {
      return cartItems.map((cartItem: ICartItem) => (
        <CartItem
          key={cartItem._id}
          cartItem={cartItem}
          updateCartItem={handleCartItemUpdate}
          removeCartItem={handleRemoveCartItem}
        />
      ))
    }
  }

  return <>{renderCartItems()}</>
}

export default CartItems
