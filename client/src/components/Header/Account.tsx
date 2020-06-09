import React, { useState } from 'react'
import { FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Account = () => {
  const [showAccountOptions, setShowAccountOptions] = useState<boolean>(false)

  const handleLogout = () => {
    console.log('logout')
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
