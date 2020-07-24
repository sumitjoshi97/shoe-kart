import React from 'react'
import './styles.scss'

interface IInputProps {
  type: string
  label: string
  name: string
  inputValue: string
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<IInputProps> = props => {
  const { type, label, name, inputValue, handleInput } = props

  const labelStyles = {
    transform: 'translateY(0.4rem) scale(0.75)',
  }

  return (
    <div className="input">
      <input
        className="input__field"
        type={type}
        name={name}
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e)}
        autoComplete="off"
      />
      <label
        htmlFor={label}
        className="input__label"
        style={inputValue ? labelStyles : undefined}
      >
        {label}
      </label>
      <div className="input__baseline" />
    </div>
  )
}

export default Input
