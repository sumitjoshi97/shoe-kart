import React, { useState } from 'react'
import { FiShoppingCart, FiUser } from 'react-icons/fi'
import './styles.scss'
import SearchInput from './SearchInput'
import { Link } from 'react-router-dom'
import { useGlobalDispatch, useGlobalState } from '~store'
import Button from '~components/shared/Button'

const Header: React.FC = () => {
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
            Cart
            <div className="header__ctas__cart__icon">
              <FiShoppingCart />
            </div>
          </div>
          {state.userId !== '' ? (
            <div className="header__profile">
              <FiUser />
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

export default Header
