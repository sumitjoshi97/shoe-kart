import React from 'react'
import { useQuery, useMutation } from 'react-apollo'
import * as queries from './queries'
import CartItem from './CartItem'
import './styles.scss'
import OrderSummary from '../shared/CartSummary'
import Button from '~components/shared/Button'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

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
      <div className="cart">
      <div className="cart__items">
        <h2 className="cart__items__header">My Bag</h2>
        <div className="cart__items__list">{renderCartItems()}</div>
      </div>

      <div className="cart__summary">
        <OrderSummary />

        <div className="cart__summary__checkout">
          <Button styles={{ flex: 1 }}>
            <Link to="/checkout" className="cart__summary__checkout__link">
              Checkout
              <FiArrowRight style={{ marginLeft: '0.5rem' }} />
            </Link>
          </Button>
        </div>
        <div className="cart__summary__cont-shopping">
          <Link to="/results" className="cart__summary__cont-shopping__link">
            Add more to Cart
            <FiArrowRight style={{ marginLeft: '0.5rem' }} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart
