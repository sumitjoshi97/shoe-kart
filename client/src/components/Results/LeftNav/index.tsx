import React from 'react'

import Categories from './Categories'
import Filter from './Filter'
import { useProductDispatch, useProductState } from '../products-context'
import { IFilter } from '../interface'

const LeftNav: React.FC<any> = () => {
  const { state } = useProductState()
  const { dispatch } = useProductDispatch()
  const resetProducts = () => {
    dispatch({
      type: 'RESET_PRODUCTS',
    })
  }

  const renderFilters = (filters: any, activeFilters: IFilter) => {
    return Object.keys(filters).map((filterType: any, index: number) => (
      <Filter
        key={index + filterType}
        type={filterType}
        filterOptions={filters[filterType]}
        activeFilterOptions={activeFilters[filterType]}
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
            categories={state.categories}
            activeCategory={state.activeCategory}
            dispatch={dispatch}
          />
        </div>
        <div className="left-nav__filters">
          {renderFilters(state.filters, state.activeFilters)}
        </div>
      </div>
    </div>
  )
}

export default LeftNav
