import React from 'react'
import { ISizeProps } from './interface'

const Size: React.FC<ISizeProps> = ({ size, isSizeSelected, selectSize }) => {
  return (
    <div
      className="size"
      onClick={selectSize}
      style={{
        border: isSizeSelected ? '1.2px solid #000' : '1px solid #c0c0c0',
      }}
    >
      {size}
    </div>
  )
}

export default Size
