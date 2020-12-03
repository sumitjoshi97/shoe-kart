import React from 'react'

import CategoryItem from './CategoryItem'

import useStores from '~hooks/useStores'
import { ICategory } from '~interface'

interface ICategoryProps {
  categories: ICategory[]
}

const Category: React.FC<ICategoryProps> = ({ categories }) => {
  const { uiStore } = useStores()
  const { activeMainCategory, handleActiveMainCategory } = uiStore

  const setActiveCategory = (category: string) => {
    handleActiveMainCategory(category)
  }

  const renderCategories = () => {
    return categories.map((category: ICategory) => (
      <CategoryItem
        key={category._id}
        id={category._id}
        name={category.name}
        isActiveCategory={activeMainCategory === category._id}
        setActiveCategory={setActiveCategory}
      />
    ))
  }

  return <div className="categories">{renderCategories()}</div>
}

export default Category
