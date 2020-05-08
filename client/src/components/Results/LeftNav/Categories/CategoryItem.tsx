import React from 'react'
import { ICategoryItemProps } from '../../interface'

const CategoryItem: React.FC<ICategoryItemProps> = props => {
  const { name, count, isActiveCategory } = props

  let categoryStyles = {}
  if (isActiveCategory) {
    categoryStyles = {
      ...categoryStyles,
      opacity: 0.5,
    }
  }

  return (
    <div className="category-item">
      <div
        className="category-item__name"
        style={categoryStyles}
        onClick={() => props.setActiveCategory(name)}
      >
        {name}
        <span className="category-item__name__count">({count})</span>
      </div>
    </div>
  )
}

export default CategoryItem
