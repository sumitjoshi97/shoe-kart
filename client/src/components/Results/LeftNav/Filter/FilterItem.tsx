import React from 'react'

interface IFilterItemProps {
  name: string | number
}
const FilterItem: React.FC<IFilterItemProps> = ({ name }) => {
  return <div>{name}</div>
}

export default FilterItem
