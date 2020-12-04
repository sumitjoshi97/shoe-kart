import React from 'react'
import { FiX } from 'react-icons/fi'

import Button from '~components/shared/Button'
import LeftNav from './index'

import useStores from '~hooks/useStores'

const LeftNavMobile: any = () => {
  const { uiStore } = useStores()
  const { toggleLeftNav } = uiStore

  return (
    <div className="left-nav-mobile-container">
      <div className="left-nav-mobile-container__bg" onClick={toggleLeftNav} />
      <div className="left-nav-mobile">
        <Button
          onClick={toggleLeftNav}
          styles={{ margin: '0 2rem 2rem 0' }}
          color="white"
        >
          <FiX />
        </Button>
        <LeftNav />
      </div>
    </div>
  )
}

export default LeftNavMobile
