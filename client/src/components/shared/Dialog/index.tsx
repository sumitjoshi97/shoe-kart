import React from 'react'
import { useGlobalDispatch } from '~store'
import { FiX } from 'react-icons/fi'
import './styles.scss'
import Button from '../Button'

const Dialog: React.FC<React.ReactNode> = ({ children }) => {
  const { dispatch } = useGlobalDispatch()

  return (
    <div className="dialog-container">
      <div
        className="dialog-container__toggle"
        onClick={() => dispatch({ type: 'TOGGLE_DIALOG' })}
      />
      <div className="dialog">
        <Button
          color="white"
          className="dialog__toggle-btn"
          onClick={() => dispatch({ type: 'TOGGLE_DIALOG' })}
        >
          <FiX />
        </Button>
        {children}
      </div>
    </div>
  )
}

export default Dialog
