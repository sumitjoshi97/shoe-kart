import React from 'react'
import CartItem from './CartItem'
import './styles.scss'
import isEmpty from '~helpers/isEmpty'
import { ICartItem } from './interface'
import CartSummary from '../shared/CartSummary'
import Button from '~components/shared/Button'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import withCart from '~hocs/cart/withCart'

const Cart = (props: any) => {
  const handleCartItemUpdate = (
    cartItemId: string,
    quantity: number,
    selectedSize: number,
  ) => {
    props.updateCartItem(cartItemId, quantity, selectedSize)
  }

  const handleRemoveCartItem = (cartItemId: string) => {
    props.removeCartItem(cartItemId)
  }

  const renderCartItems = () => {
    if (!isEmpty(props.cart.items)) {
      return props.cart.items.map((cartItem: ICartItem) => (
        <CartItem
          key={cartItem._id}
          cartItem={cartItem}
          updateCartItem={handleCartItemUpdate}
          removeCartItem={handleRemoveCartItem}
        />
      ))
    }
  }

  return (
    <div className="cart">
      <div className="cart__items">
        <h2 className="cart__items__header">My Bag</h2>
        <div className="cart__items__list">{renderCartItems()}</div>
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

export default withCart(Cart)
