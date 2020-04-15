import React, { useContext } from 'react'

import {
  ProductsStateContext,
  ProductsDispatchContext,
} from '../../products-context'
import CategoryItem from './CategoryItem'
import { ICategory } from '../../interface'

const Categories: React.FC = () => {
  const { state } = useContext(ProductsStateContext)
  const { dispatch } = useContext(ProductsDispatchContext)

  let categories: any = []
  if (state.products && state.products !== []) {
    state.products.forEach((product: any) => {
      const category = categories.find(
        (category: ICategory) => category.name === product.category,
      )
      if (!category) {
        categories.push({ name: product.category, count: 1 })
      } else {
        category.count += 1
      }
    })
  }

  const renderCategories = (categories: ICategory[]) => {
    return categories.map((category: ICategory, index: number) => (
      <CategoryItem
        key={index + ' ' + category.name}
        name={category.name}
        count={category.count}
        dispatch={dispatch}
      />
    ))
  }

  return <div className="categories">{renderCategories(categories)}</div>
}

export default Categories
