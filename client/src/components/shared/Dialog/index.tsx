import React from 'react'
import { FiX } from 'react-icons/fi'

import Button from '../Button'
import useStores from '~hooks/useStores'

import './styles.scss'

const Dialog: React.FC<React.ReactNode> = ({ children }) => {
  const { uiStore } = useStores()
  const { toggleDialog } = uiStore

  return (
    <div className="dialog-container">
      <div className="dialog-container__toggle" onClick={toggleDialog} />
      <div className="dialog">
        <Button
          color="white"
          className="dialog__toggle-btn"
          onClick={toggleDialog}
        >
          <FiX />
        </Button>
        {children}
      </div>
    </div>
  )
}

export default Dialog
