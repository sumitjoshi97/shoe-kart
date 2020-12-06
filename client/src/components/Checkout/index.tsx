import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import Button from '~components/shared/Button'
import CartSummary from '~components/shared/CartSummary'
import Dialog from '~components/shared/Dialog'
import Layout from '~components/Layout'
import Loading from '~components/shared/Loading'
import OrderItem from '~components/shared/OrderItem'
import Payment from './Payment'
import ShippingAddress from '~components/shared/ShippingAddress'

import useAddress from '~hooks/address/useAddress'
import useCart from '~hooks/cart/useCart'
import useOrder from '~hooks/order/useOrder'
import useStores from '~hooks/useStores'

import { ICartItem } from '~interface'
import isEmpty from '~helpers/isEmpty'
import './styles.scss'

const Checkout = () => {
  const { authStore, uiStore } = useStores()
  const { isAuth } = authStore
  const {
    activePaymentMethod,
    showDialog,
    toggleDialog,
    handleActivePaymentMethod,
  } = uiStore
  const { cart, isCartLoading, clearCart } = useCart()
  const { isAddressLoading } = useAddress()
  const { createOrder, createdOrderData, createOrderLoading } = useOrder()

  const [stripe] = useState(() => loadStripe(process.env.STRIPE_PUBLIC_KEY!))

  const renderOrderItems = () => {
    if (cart && isEmpty(cart)) return

    return cart.items.map((cartItem: ICartItem) => (
      <OrderItem key={cartItem._id} orderItem={cartItem} />
    ))
  }

  const renderCheckout = () => {
    if (isAddressLoading || isCartLoading || !stripe) return <Loading />

    if (!isAuth) {
      return <Redirect to="/" />
    }

    if (cart.quantity === 0 && !!createdOrderData) {
      return (
        <Dialog>
          order created successfully,
          <Button>
            <Link to="/user/orders">view orders</Link>
          </Button>
        </Dialog>
      )
    }

    if (cart.quantity === 0) {
      return <Redirect to="/cart" />
    }

    if (createOrderLoading) {
      return <Dialog>Please wait while we are creating your order</Dialog>
    }

    return (
      <Elements stripe={stripe}>
        <div className="checkout__sections">
          <ShippingAddress />
          <div className="checkout__sections__order">
            <h2>Order summary</h2>
            {renderOrderItems()}
          </div>
          <Payment
            isCartEmpty={!isEmpty(cart.items)}
            createOrder={createOrder}
            clearCart={clearCart}
            showDialog={showDialog}
            toggleDialog={toggleDialog}
            activePaymentMethod={activePaymentMethod}
            handleActivePaymentMethod={handleActivePaymentMethod}
          />
        </div>
        <div className="checkout__summary">
          <CartSummary cartSize={cart.quantity} cartPrice={cart.price} />
        </div>
      </Elements>
    )
  }

  return (
    <Layout medium>
      <div className="checkout">{renderCheckout()}</div>
    </Layout>
  )
}

export default Checkout
