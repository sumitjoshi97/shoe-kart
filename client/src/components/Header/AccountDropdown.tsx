import React, { useState } from 'react'
import { FiUser } from 'react-icons/fi'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'

import Button from '~components/shared/Button'

import useStores from '~hooks/useStores'

export interface IAccountDropdownProps extends RouteComponentProps {}

const AccountDropdown: React.FC<IAccountDropdownProps> = props => {
  const { authStore, uiStore } = useStores()
  const { isAuth, removeUser } = authStore
  const { toggleDialog } = uiStore
  const [showAccountOptions, setShowAccountOptions] = useState<boolean>(false)

  const handleLogout = () => {
    removeUser()
    props.history.push('/')
  }

  const accountDropdownOptions = (
    <div className="account-dropdown__options">
      <ul className="account-dropdown__options__list">
        <li className="account-dropdown__options__list__option">
          <Link to="/user/orders">orders</Link>
        </li>
        <li className="account-dropdown__options__list__option">
          <Link to="/user/profile">profile</Link>
        </li>
        <li className="account-dropdown__options__list__option">
          <button onClick={handleLogout}>logout</button>
        </li>
      </ul>
    </div>
  )

  return (
    <>
      {isAuth ? (
        <div
          className="account-dropdown"
          onMouseEnter={() => setShowAccountOptions(true)}
          onMouseLeave={() => setShowAccountOptions(false)}
        >
          <span>account</span>
          <FiUser />
          {showAccountOptions && accountDropdownOptions}
        </div>
      ) : (
        <Button onClick={toggleDialog}>Login</Button>
      )}
    </>
  )
}

export default withRouter(AccountDropdown)
