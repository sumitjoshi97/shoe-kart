import React from 'react'
import Button from '~components/shared/Button'
import CartSummary from '../shared/CartSummary'
import CartItems from '~components/shared/CartItems'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import './styles.scss'

const Cart = () => {
  return (
    <div className="cart">
      <div className="cart__items">
        <CartItems header="my bag" />
      </div>

      <div className="cart__summary">
        <CartSummary />

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
