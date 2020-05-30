import React from 'react'
import './styles.scss'

interface IButtonProps {
  type?: string
  styles?: { [key: string]: number | string }
  className?: string
  onClick?: (arg: any) => any
}

const Button: React.FC<IButtonProps> = ({
  type,
  styles,
  className,
  onClick,
  children,
}) => {
  const buttonStyles = {
    ...styles,
    backgroundColor: type === 'white' ? '#fff' : '#000',
    color: type === 'white' ? '#000' : '#fff',
  }
  return (
    <button
      className={`button ${className}`}
      style={buttonStyles}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button

Button.defaultProps = {
  styles: {},
  type: 'default',
  className: '',
}
