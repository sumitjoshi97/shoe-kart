import React from 'react'

interface ISizeProps {
  size: string
  isSizeSelected: boolean
  selectSize: () => void
}

const Size: React.FC<ISizeProps> = ({ size, isSizeSelected, selectSize }) => {
  return (
    <div
      className="size"
      onClick={selectSize}
      style={{
        background: isSizeSelected ? '#000' : '#fff',
        color: isSizeSelected ? '#fff' : '#000',
      }}
    >
      {size}
    </div>
  )
}

export default Size
