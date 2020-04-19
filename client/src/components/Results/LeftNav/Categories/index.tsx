import React from 'react'

import CategoryItem from './CategoryItem'
import { ICategory } from '../../interface'

interface ICategoryProps {
  categories: ICategory[]
  activeCategory: string
  dispatch: React.Dispatch<any>
}

const Categories: React.FC<ICategoryProps> = props => {
  const { categories, activeCategory, dispatch } = props

  const renderCategories = (categories: ICategory[]) => {
    return categories.map((category: ICategory, index: number) => (
      <CategoryItem
        key={index + ' ' + category.name}
        name={category.name}
        value={category.name}
        count={category.count}
        isActiveCategory={activeCategory === category.name}
        dispatch={dispatch}
      />
    ))
  }

  return <div className="categories">{renderCategories(categories)}</div>
}

export default Categories
