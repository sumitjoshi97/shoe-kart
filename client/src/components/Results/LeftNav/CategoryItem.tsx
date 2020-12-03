import React from 'react'

interface ICategoryItemProps {
  id: string
  name: string
  isActiveCategory: boolean
  setActiveCategory: (category: string) => void
}

const CategoryItem: React.FC<ICategoryItemProps> = props => {
  const { id, name, isActiveCategory } = props

  const handleCategory = () => {
    if (isActiveCategory) return
    props.setActiveCategory(id)
  }

  return (
    <div
      className="category-item"
      style={{ opacity: isActiveCategory ? 0.5 : 1 }}
      onClick={handleCategory}
    >
      {name}
    </div>
  )
}

export default CategoryItem
