import React from 'react'
import { IFormInputProps } from './interface'

const FormInput: React.FC<IFormInputProps> = props => {
  const { type, label, inputValue, handleInput } = props

  const labelStyles = {
    transform: 'translateY(-1.4rem) scale(0.85)',
  }

  return (
    <div className="form-input">
      <input
        className="form-input__input"
        type={type}
        name={label}
        value={inputValue}
        autoComplete="off"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e)}
      />
      <label
        htmlFor={label}
        className="form-input__label"
        style={inputValue !== '' ? labelStyles : undefined}
      >
        {`Enter ${label}`}
      </label>
    </div>
  )
}

export default FormInput
