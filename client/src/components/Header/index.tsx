import React from 'react'
import { Link } from 'react-router-dom'

import AccountDropdown from './AccountDropdown'
import CartIcon from './CartIcon'

import './styles.scss'

const Header = () => {
  return (
    <div className="header-container">
      <div className="header">
        <div className="header__logo">
          <Link to="/">ShoeKart</Link>
        </div>
        <div className="header__separator" />

        <div className="header__ctas">
          <div className="header__ctas__cart">
            <Link to="/cart" className="header__ctas__cart__link">
              <CartIcon />
            </Link>
          </div>
          <div className="header__ctas__profile">
            <AccountDropdown />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
