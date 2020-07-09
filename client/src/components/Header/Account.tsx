import React, { useState } from 'react'
import { FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useGlobalDispatch } from '~store'

const Account: React.FC<any> = props => {
  const { dispatch } = useGlobalDispatch()
  const [showAccountOptions, setShowAccountOptions] = useState<boolean>(false)

  const handleLogout = () => {
    dispatch({ type: 'REMOVE_USER' })
    props.handleLogout()
  }

  const accountOptions = (
    <div className="account__options">
      <ul className="account__options__list">
        <li className="account__options__list__option">
          <Link to="/user/orders">orders</Link>
        </li>
        <li className="account__options__list__option">
          <Link to="/user/favorites">favorites</Link>
        </li>
        <li className="account__options__list__option">
          <Link to="/user/profile">profile</Link>
        </li>
        <li className="account__options__list__option">
          <button onClick={handleLogout}>logout</button>
        </li>
      </ul>
    </div>
  )

  return (
    <div
      className="account"
      onMouseEnter={() => setShowAccountOptions(true)}
      onMouseLeave={() => setShowAccountOptions(false)}
    >
      <span>account</span>
      <FiUser />
      {showAccountOptions && accountOptions}
    </div>
  )
}

export default Account
