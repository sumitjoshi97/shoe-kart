import React from 'react'
import Title from '../Title'
import withCart from '~hocs/cart/withCart'
import './styles.scss'

const CartSummary: React.FC = (props: any) => {
  return (
    <div className="cart-summary">
      <Title>summary</Title>
      <div className="cart-summary__sub-total">
        <div className="cart-summary__sub-total__title">
          SubTotal <span>{`(${props.cart.quantity} items)`}</span>
        </div>
        <div className="cart-summary__sub-total__cost">{`$${props.cart.price}`}</div>
      </div>
    </div>
  )
}

export default withCart(CartSummary)
