import React from 'react'

import './styles.scss'

interface ICartSummaryProps {
  cartPrice: number
  cartSize: number
}

const CartSummary: React.FC<ICartSummaryProps> = ({ cartPrice, cartSize }) => {
  return (
    <div className="cart-summary">
      <h2 className="title-primary">summary</h2>
      <div className="cart-summary__sub-total">
        <div className="cart-summary__sub-total__title">
          SubTotal <span>{`(${cartSize} items)`}</span>
        </div>
        <div className="cart-summary__sub-total__cost">{`$${cartPrice}`}</div>
      </div>
    </div>
  )
}

export default CartSummary
