import React from 'react'
import './styles.scss'
import { useGlobalState } from '~store'

const CartSummary: React.FC = () => {
  const { state } = useGlobalState()

  return (
    <div className="cart-summary">
      <h2 className="cart-summary__header">summary</h2>
      <div className="cart-summary__sub-total">
        <div className="cart-summary__sub-total__title">
          SubTotal <span>{`(${state.cartSize} items)`}</span>
        </div>
        <div className="cart-summary__sub-total__cost">{`$${state.cartPrice}`}</div>
      </div>
    </div>
  )
}

export default CartSummary
