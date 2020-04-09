import React from 'react'

import './styles.scss'

const Header: React.FC = () => {
  return (
    <div className="header-container">
      <div className="header">
        <div className="header__logo">image</div>
        <div className="header__nav">
          <ul>
            <li>men</li>
            <li>women</li>
            <li>children</li>
          </ul>
        </div>

        <div className="header__ctas">
          <ul>
            <li className="header__search">
              <input type="text" />
            </li>
            <li>cart</li>
            <li>profile</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
