import React from 'react'
import { useQuery, useMutation } from 'react-apollo'
import * as queries from './queries'
import CartItem from './CartItem'
import './styles.scss'
import { useGlobalState, useGlobalDispatch } from '~store'
import isEmpty from '~helpers/isEmpty'
import { getLocalCart } from '~helpers/localCart'
import { ICartItem } from './interface'
import OrderSummary from '../shared/CartSummary'
import Button from '~components/shared/Button'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

const Cart = () => {
  const { state } = useGlobalState()
  const { dispatch } = useGlobalDispatch()

  const { data } = useQuery(queries.GET_CART, { fetchPolicy: 'network-only' })
  const [updateCartItem] = useMutation(queries.UPDATE_CART_ITEM)
  const [removeCartItem] = useMutation(queries.REMOVE_FROM_CART)

  const handleCartItemUpdate = (
    cartItemId: string,
    quantity: number,
    selectedSize: number,
  ) => {
    if (isEmpty(state.userId) && !isEmpty(state.cart)) {
      dispatch({ type: 'UPDATE_CART_ITEM', cartItemId, quantity, selectedSize })
      dispatch({ type: 'UPDATE_CART_INFO', cart: state.cart })
    }
    if (!isEmpty(state.userId)) {
      updateCartItem({
        variables: { cartItemId, quantity, selectedSize },
        refetchQueries: [{ query: queries.GET_CART }],
      })
      dispatch({ type: 'UPDATE_CART_INFO', cart: data.cart.items })
    }
  }

  const handleRemoveCartItem = (cartItemId: string) => {
    if (isEmpty(state.userId)) {
      dispatch({ type: 'REMOVE_FROM_CART', cartItemId })
      dispatch({ type: 'UPDATE_CART_INFO', cart: data.cart.items })
    }
    if (!isEmpty(state.userId)) {
      removeCartItem({
        variables: { cartItemId },
        refetchQueries: [{ query: queries.GET_CART }],
      })
      dispatch({ type: 'UPDATE_CART_INFO', cart: data.cart.items })
    }
  }

  const getCartItems = () => {
    if (data && data.cart && !isEmpty(state.userId)) {
      return data.cart.items
    }

    if (isEmpty(state.userId) && !isEmpty(state.cart)) {
      return Object.values(state.cart)
    }

    const cart = getLocalCart()
    if (cart && isEmpty(state.userId) && isEmpty(state.cart)) {
      const parsedCart = JSON.parse(cart)
      if (!isEmpty(parsedCart)) {
        dispatch({ type: 'INIT_CART', cart: parsedCart })
        return Object.values(parsedCart)
      }
    }

    return []
  }

  const renderCartItems = () => {
    return getCartItems().map((cartItem: ICartItem) => (
      <CartItem
        key={cartItem._id}
        cartItem={cartItem}
        updateCartItem={handleCartItemUpdate}
        removeCartItem={handleRemoveCartItem}
      />
    ))
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
