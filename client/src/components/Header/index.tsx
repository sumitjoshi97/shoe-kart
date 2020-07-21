import React, { useState } from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import './styles.scss'
import SearchInput from './SearchInput'
import { Link, withRouter } from 'react-router-dom'
import AccountDropdown from './AccountDropdown'
import { IHeaderProps } from './interface'
import withCart from '~hocs/cart/withCart'

const Header: React.FC<IHeaderProps> = props => {
  const [searchText, setSearchText] = useState<string>('')
  const { cart } = props
  const handleSearchInput = (e: any) => {
    setSearchText(e.target.value)
  }

  const handleSearch = () => {
    if (searchText !== '') {
      setSearchText('')
    }
  }

  const handleLogout = () => {
    props.history.push('/')
  }

  return (
    <div className="header-container">
      <div className="header">
        <div className="header__logo">
          <Link to="/">ShoeKart</Link>
        </div>
        <div className="header__separator" />
        <nav className="header__nav">
          <ul>
            <li>men</li>
            <li>women</li>
            <li>children</li>
          </ul>
        </nav>
        <div className="header__ctas">
          <div className="header__ctas__search">
            <SearchInput
              handleSearchInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSearchInput(e)
              }
              handleSearch={handleSearch}
              searchText={searchText}
            />
          </div>
          <div className="header__ctas__cart">
            <Link to="/cart" className="header__ctas__cart__link">
              Cart
              <div className="header__ctas__cart__link__icon">
                <FiShoppingCart />
                {cart.quantity > 0 && (
                  <span className="header__ctas__cart__link__icon__count">
                    {cart.quantity}
                  </span>
                )}
              </div>
            </Link>
          </div>
          <div className="header__ctas__profile">
            <AccountDropdown handleLogout={handleLogout} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(withCart(Header))
