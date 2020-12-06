import React from 'react'
import './styles.scss'

export interface IButtonProps {
  type?: 'button' | 'submit' | undefined
  color?: string
  styles?: { [key: string]: number | string }
  className?: string
  disabled?: boolean
  onClick?: (arg: any) => any
}

const Button: React.FC<IButtonProps> = ({
  type,
  color,
  styles,
  className,
  onClick,
  children,
}) => {
  const buttonStyles = {
    ...styles,
    backgroundColor: color === 'white' ? '#fff' : '#000',
    color: color === 'white' ? '#000' : '#fff',
  }
  return (
    <button
      className={`button ${className}`}
      style={buttonStyles}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button

Button.defaultProps = {
  styles: {},
  type: 'button',
  color: 'black',
  className: '',
  disabled: false,
}
