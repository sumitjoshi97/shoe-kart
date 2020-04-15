import React from 'react'

const CategoryItem: React.FC<any> = ({ name, count, dispatch }) => {
  const setCategory = (category: string) => {
    dispatch({
      type: 'SET_ACTIVE_CATEGORY',
      category,
    })
  }

  return (
    <div className="category-item">
      <div className="category-item__name" onClick={() => setCategory(name)}>
        {name}
      </div>
      <div className="category-item__count">({count})</div>
    </div>
  )
}

export default CategoryItem
