import React from 'react'

import Categories from './Categories'
import Filter from './Filter'

const LeftNav: React.FC<any> = () => (
  <div className="left-nav-container">
    <div className="left-nav">
      <div className="left-nav__categories">
        <Categories />
        <Filter type="gender" />
        <Filter type="color" />
        <Filter type="size" />
      </div>
    </div>
  </div>
)

export default LeftNav
