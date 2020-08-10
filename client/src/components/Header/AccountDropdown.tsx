import React, { useState } from 'react'
import { FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useGlobalDispatch, useGlobalState } from '~store'
import isEmpty from '~helpers/isEmpty'
import Button from '~components/shared/Button'

const AccountDropdown: React.FC<any> = props => {
  const { state } = useGlobalState()
  const { dispatch } = useGlobalDispatch()
  const [showAccountOptions, setShowAccountOptions] = useState<boolean>(false)

  const handleLogout = () => {
    dispatch({ type: 'REMOVE_USER' })
    props.handleLogout()
  }

  const accountDropdownOptions = (
    <div className="account-dropdown__options">
      <ul className="account-dropdown__options__list">
        <li className="account-dropdown__options__list__option">
          <Link to="/user/orders">orders</Link>
        </li>
        <li className="account-dropdown__options__list__option">
          <Link to="/user/favorites">favorites</Link>
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
      {!isEmpty(state.userId) ? (
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
        <Button onClick={() => dispatch({ type: 'TOGGLE_DIALOG' })}>
          Login
        </Button>
      )}
    </>
  )
}

export default AccountDropdown
