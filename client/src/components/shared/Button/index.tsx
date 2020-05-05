import React from 'react'
import './styles.scss'

const Button: React.FC<any> = props => {
  return (
    <button
      className={`button ${props.className ? props.className : ''}`}
      style={props.style}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default Button
