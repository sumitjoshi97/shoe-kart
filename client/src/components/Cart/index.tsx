import React from 'react'
import { useQuery, useMutation } from 'react-apollo'
import * as queries from './queries'
import CartItem from './CartItem'
import './styles.scss'

const Cart = () => {
  const { data } = useQuery(queries.GET_CART)
  const [updateCartItem] = useMutation(queries.UPDATE_CART_ITEM)
  const [removeCartItem] = useMutation(queries.REMOVE_FROM_CART)

  const handleCartItemUpdate = (
    cartItemId: string,
    quantity: number,
    selectedSize: number,
  ) => {
    updateCartItem({
      variables: { cartItemId, quantity, selectedSize },
      refetchQueries: [{ query: queries.GET_CART }],
    })
  }

  const handleRemoveCartItem = (cartItemId: string) => {
    removeCartItem({
      variables: { cartItemId },
      refetchQueries: [{ query: queries.GET_CART }],
    })
  }

  const renderCartItems = () => {
    if (data && data.cart) {
      return data.cart.items.map((cartItem: any) => {
        const {
          _id: cartItemId,
          product: {
            _id: productId,
            name,
            image,
            price,
            size,
            gender,
            category,
          },
          quantity,
          selectedSize,
        } = cartItem

        return (
          <CartItem
            key={cartItemId}
            id={cartItemId}
            productId={productId}
            name={name}
            image={image[0]}
            price={price}
            size={size}
            gender={gender}
            category={category}
            quantity={quantity}
            selectedSize={selectedSize}
            updateCartItem={handleCartItemUpdate}
            removeCartItem={handleRemoveCartItem}
          />
        )
      })
    }
  }
  return (
    <div className="cart-container">
      <div className="cart">
        <h2 className="cart__header">My Bag</h2>
        <div className="cart__items">{renderCartItems()}</div>
      </div>
      <div className="cart-summary"></div>
    </div>
  )
}

export default Cart
