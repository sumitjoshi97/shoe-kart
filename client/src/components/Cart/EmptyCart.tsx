import React from 'react'
import { FiShoppingBag } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Button from '../shared/Button'
import './styles.scss'

const EmptyCart = () => {
  return (
    <div className="empty-cart medium-container">
      <FiShoppingBag
        style={{ marginBottom: '2rem', height: '12rem', width: '12rem' }}
      />
      <h2 className="title-primary">Sorry, it seems something is empty here</h2>
      <p className="empty-cart__text">
        It appears that your cart is empty, don't be afraid of spending here. We
        already got your credit card.
      </p>
      <Button>
        <Link to="/results" className="empty-cart__link">
          Go back to shopping
        </Link>
      </Button>
    </div>
  )
}

export default EmptyCart
