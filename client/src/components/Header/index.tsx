import React, { useState } from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import './styles.scss'
import SearchInput from './SearchInput'
import { Link, withRouter } from 'react-router-dom'
import { useGlobalDispatch, useGlobalState } from '~store'
import Button from '~components/shared/Button'
import isEmpty from '~helpers/isEmpty'
import Account from './Account'
import { IHeaderProps } from './interface'

const Header: React.FC<IHeaderProps> = props => {
  const [searchText, setSearchText] = useState<string>('')

  const { state } = useGlobalState()
  const { dispatch } = useGlobalDispatch()

  const handleSearchInput = (e: any) => {
    setSearchText(e.target.value)
  }

  const handleSearch = () => {
    if (searchText !== '') {
      console.log(searchText)
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
              </div>
            </Link>
          </div>
          {!isEmpty(state.userId) ? (
            <div className="header__ctas__profile">
              <Account handleLogout={handleLogout} />
            </div>
          ) : (
            <Button onClick={() => dispatch({ type: 'SHOW_AUTH_DIALOG' })}>
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default withRouter(Header)
