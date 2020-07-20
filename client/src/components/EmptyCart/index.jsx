import React from 'react'
import Title from '../shared/Title'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <Title>
        your cart is empty, least add something before reaching out to me.
      </Title>
      <Link to="/results" className="cart__summary__cont-shopping__link">
        Add more to Cart
        <FiArrowRight style={{ marginLeft: '0.5rem' }} />
      </Link>
    </div>
  )
}

export default EmptyCart
