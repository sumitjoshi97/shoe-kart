import React from 'react'

import CategoryItem from './CategoryItem'
import { ICategory, ICategoryProps } from '../../interface'

const Categories: React.FC<ICategoryProps> = props => {
  const { categories, activeCategory } = props

  const renderCategories = (categories: ICategory[]) => {
    return categories.map((category: ICategory, index: number) => (
      <CategoryItem
        key={index + ' ' + category.name}
        name={category.name}
        count={category.count}
        isActiveCategory={activeCategory === category.name}
        setActiveCategory={props.setActiveCategory}
      />
    ))
  }

  return <div className="categories">{renderCategories(categories)}</div>
}

export default Categories
