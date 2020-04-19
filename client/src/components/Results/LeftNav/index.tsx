import React from 'react'

import Categories from './Categories'
import Filter from './Filter'
import { useProductDispatch, useProductState } from '../products-context'
import { IProduct, ICategory } from '../interface'

const LeftNav: React.FC<any> = () => {
  const { state } = useProductState()
  const { dispatch } = useProductDispatch()
  const resetProducts = () => {
    dispatch({
      type: 'RESET_PRODUCTS',
    })
  }

  const getCategories = () => {
    let categories: ICategory[] = []
    if (state && state.products && state.products !== []) {
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
    return categories
  }

  const getFilterOptions = (type: string) => {
    let filterOptions: (string | number)[] = []
    if (state.products) {
      state.products.forEach((product: IProduct) => {
        const options: (string | number)[] | string = product[type]
        if (Array.isArray(options)) {
          options.forEach((option: string | number) => {
            if (!filterOptions.includes(option)) {
              filterOptions.push(option)
            }
          })
        } else {
          if (!filterOptions.includes(options)) {
            filterOptions.push(options)
          }
        }

        if (typeof filterOptions[0] === 'number') {
          filterOptions.sort((option1: any, option2: any) => option1 - option2)
        }
      })
    }
    return filterOptions
  }

  const renderFilters = (filterTypes: string[]) => {
    return filterTypes.map((filterType: string, index: number) => (
      <Filter
        key={index + filterType}
        type={filterType}
        filterOptions={getFilterOptions}
        activeFilterOptions={state.activeFilters[filterType]}
        dispatch={dispatch}
      />
    ))
  }

  return (
    <div className="left-nav-container">
      <div className="left-nav">
        <div className="left-nav__all-products" onClick={() => resetProducts()}>
          All
          <span className="left-nav__all-products__count">
            ({state.products.length})
          </span>
        </div>
        <div className="left-nav__categories">
          <Categories
            categories={getCategories()}
            activeCategory={state.activeCategory}
            dispatch={dispatch}
          />
        </div>
        <div className="left-nav__filters">
          {renderFilters(state.filterTypes)}
        </div>
      </div>
    </div>
  )
}

export default LeftNav
