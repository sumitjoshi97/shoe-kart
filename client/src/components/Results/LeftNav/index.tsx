import React from 'react'
import Categories from './Categories'
import Filter from './Filter'
import { ILeftNavProps, IFilters } from '../interface'
import isEmpty from '~helpers/isEmpty'

const LeftNav: React.FC<ILeftNavProps> = ({ resultsStore, ...props }) => {
  const renderFilters = () => {
    if (
      !isEmpty(resultsStore.filters) &&
      !isEmpty(resultsStore.activeFilters)
    ) {
      const { filters, activeFilters } = resultsStore as {
        filters: IFilters
        activeFilters: IFilters
      }
      return Object.keys(filters).map((filterType: string, index: number) => (
        <Filter
          key={index + filterType}
          type={filterType}
          filterOptions={filters[filterType]}
          activeFilterOptions={activeFilters[filterType]}
          setActiveFilters={props.setActiveFilters}
        />
      ))
    }
  }

  return (
    <div className="left-nav-container">
      <div className="left-nav">
        <div
          className="left-nav__all-products"
          onClick={props.resetResultsStore}
        >
          All
        </div>
        <div className="left-nav__categories">
          <Categories
            categories={resultsStore.categories}
            activeCategory={resultsStore.activeCategory}
            setActiveCategory={props.setActiveCategory}
          />
        </div>
        <div className="left-nav__filters">{renderFilters()}</div>
      </div>
    </div>
  )
}

export default LeftNav
