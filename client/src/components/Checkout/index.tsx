import React from 'react'
import Shipping from './Shipping'
import CartSummary from '~components/shared/CartSummary'
import './styles.scss'
import CartItems from '~components/shared/CartItems'
import Payment from './Payment'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import withCart from '~hocs/cart/withCart'
import useOrder from '~hooks/order/useOrder'
import EmptyCart from '../EmptyCart'
import { Redirect } from 'react-router-dom'

const Checkout: React.FC<any> = ({ cart, clearCart }) => {
  const stripe = loadStripe(process.env.STRIPE_PUBLIC_KEY!)
  const { createOrder, createdOrderData, createOrderLoading } = useOrder()

  const renderCheckout = () => {
    if (cart.quantity === 0 && !createOrderLoading && createdOrderData) {
      return <Redirect to={`/order/${createdOrderData.createOrder._id}/`} />
    }

    if (cart.quantity === 0) {
      return <EmptyCart />
    }

    if (createOrderLoading) {
      return <h1>Please wait while we are completing your payment</h1>
    }

    return (
      <>
        <div className="checkout__sections">
          <Shipping />
          <CartItems />
          <Payment createOrder={createOrder} clearCart={clearCart} />
        </div>
        <div className="checkout__summary">
          <CartSummary />
        </div>
      </>
    )
  }

  return (
    <div className="checkout">
      <Elements stripe={stripe}>{renderCheckout()}</Elements>
    </div>
  )
}

export default withCart(Checkout)
