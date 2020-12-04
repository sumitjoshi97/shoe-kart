import React from 'react'

import Category from './Category'
import Filter from './Filter'

import useCategory from '~hooks/categories/useCategory'
import useStores from '~hooks/useStores'

const LeftNav: any = () => {
  const { categories } = useCategory()
  const { uiStore } = useStores()
  const { resetCategories } = uiStore

  const renderCategoriesAndFilters = () => {
    return categories.map(category => {
      if (category.name === 'main') {
        return <Category key={category._id} categories={category.items} />
      }
      return (
        <Filter
          key={category._id}
          type={category.name}
          filterOptions={category.items}
        />
      )
    })
  }

  return (
    <div className="left-nav-container">
      <div className="left-nav">
        <div className="left-nav__categories">
          <div className="left-nav__all-products" onClick={resetCategories}>
            All
          </div>
          {renderCategoriesAndFilters()}
        </div>
      </div>
    </div>
  )
}

export default LeftNav
