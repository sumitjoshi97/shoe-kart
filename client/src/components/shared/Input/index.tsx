import React from 'react'
import './styles.scss'

interface IInputProps {
  type: string
  label: string
  name: string
  inputValue?: string
  disabled?: boolean
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<IInputProps> = props => {
  const { type, label, name, inputValue, disabled, handleInput } = props

  const labelStyles = {
    transform: 'scale(0.8) translateY(0.4rem)',
  }

  const renderInputElement = () => {
    if (disabled) {
      return (
        <input
          className="input__field"
          type={type}
          name={name}
          disabled={disabled}
          defaultValue={inputValue}
        />
      )
    }
    return (
      <input
        className="input__field"
        type={type}
        name={name}
        disabled={disabled}
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e)}
        autoComplete="off"
      />
    )
  }

  return (
    <div className="input">
      {renderInputElement()}
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

Input.defaultProps = {
  disabled: false,
}
