import React from 'react'
import { ICategoryItemProps } from '../../interface'

const CategoryItem: React.FC<ICategoryItemProps> = props => {
  const { name, count, isActiveCategory } = props

  const handleCategory = () => {
    if (isActiveCategory) return
    props.setActiveCategory(name)
  }

  return (
    <div className="category-item">
      <div
        className="category-item__name"
        style={{ opacity: isActiveCategory ? 0.5 : 1 }}
        onClick={handleCategory}
      >
        {name}
        <span className="category-item__name__count">({count})</span>
      </div>
    </div>
  )
}

export default CategoryItem
