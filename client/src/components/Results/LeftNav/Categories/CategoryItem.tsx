import React from 'react'

interface ICategoryItemProps {
  name: string
  value: string
  count: number
  isActiveCategory: boolean
  dispatch: React.Dispatch<any>
}

const CategoryItem: React.FC<ICategoryItemProps> = props => {
  const { name, value, count, isActiveCategory, dispatch } = props

  const setCategory = (category: string) => {
    dispatch({
      type: 'SET_ACTIVE_CATEGORY',
      category,
    })
  }

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
        onClick={() => setCategory(value)}
      >
        {name}
        <span className="category-item__name__count">({count})</span>
      </div>
    </div>
  )
}

export default CategoryItem
