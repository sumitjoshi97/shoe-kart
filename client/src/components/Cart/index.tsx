import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

import Button from '~components/shared/Button'
import CartSummary from '~components/shared/CartSummary'
import CartItems from './CartItems'
import EmptyCart from './EmptyCart'
import Layout from '~components/Layout'
import Loading from '~components/shared/Loading'

import useCart from '~hooks/cart/useCart'
import useStores from '~hooks/useStores'

import isEmpty from '~helpers/isEmpty'
import './styles.scss'

const Cart = () => {
  const { cart, isCartLoading, updateCartItem, removeItemFromCart } = useCart()
  const { authStore, uiStore } = useStores()
  const { isAuth } = authStore
  const { toggleDialog } = uiStore

  const renderCart = () => {
    if (isCartLoading) return <Loading />

    if (!cart || isEmpty(cart) || cart.quantity < 1) return <EmptyCart />

    return (
      <>
        <div className="cart__items">
          <h2>my bag</h2>
          <CartItems
            cartItems={cart.items}
            updateCartItem={updateCartItem}
            removeItemFromCart={removeItemFromCart}
          />
        </div>

        <div className="cart__summary">
          <CartSummary cartSize={cart.quantity} cartPrice={cart.price} />

          <div className="cart__summary__checkout">
            {isAuth ? (
              <Button styles={{ flex: 1, marginTop: '2rem' }}>
                <Link to="/checkout" className="cart__summary__checkout__link">
                  Checkout
                  <FiArrowRight style={{ marginLeft: '0.5rem' }} />
                </Link>
              </Button>
            ) : (
              <Button
                styles={{ flex: 1, marginTop: '2rem' }}
                onClick={toggleDialog}
              >
                Login to continue
              </Button>
            )}
          </div>
          <div className="cart__summary__cont-shopping">
            <Link to="/results" className="cart__summary__cont-shopping__link">
              Add more to Cart
              <FiArrowRight style={{ marginLeft: '0.5rem' }} />
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <Layout medium>
      <div className="cart">{renderCart()}</div>
    </Layout>
  )
}

export default Cart
