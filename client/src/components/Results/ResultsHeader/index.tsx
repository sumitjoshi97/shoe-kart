import React, { useState } from 'react'
import { FiFilter, FiChevronDown } from 'react-icons/fi'

import useStores from '~hooks/useStores'
import { ISortOption } from '~interface'

const sortOptions = [
  { name: 'Featured', value: '' },
  { name: 'Price: High to Low', value: 'priceDesc' },
  { name: 'Price: Low to High', value: 'priceAsc' },
]

const ResultsHeader = () => {
  const { uiStore } = useStores()
  const { showLeftNav, sortBy, handleSortBy, toggleLeftNav } = uiStore

  const [showSort, setShowSortTo] = useState<boolean>(false)

  const handleSort = (sortOption: string) => {
    if (sortBy !== sortOption) {
      handleSortBy(sortOption)
    }
    setShowSortTo(!showSort)
  }

  const renderSortDropdown = () => (
    <div className="sort-dropdown">
      {sortOptions.map((sortOption: ISortOption) => (
        <button
          key={`${sortOption.value}`}
          className="sort-dropdown__option"
          onClick={() => handleSort(sortOption.value)}
        >
          {sortOption.name}
        </button>
      ))}
    </div>
  )

  return (
    <div className="results-header-container ">
      <header className="results-header">
        <nav className="results-header__nav">
          <button
            className="results-header__nav__hide-filters"
            onClick={toggleLeftNav}
          >
            {showLeftNav ? 'Hide Filters' : 'Show Filters'}
            <FiFilter />
          </button>
          <div className="results-header__nav__sort">
            <button
              className="results-header__nav__sort__btn"
              onClick={() => setShowSortTo(!showSort)}
            >
              Sort by
              <span>
                {
                  sortOptions.find(sortOption => sortOption.value === sortBy)
                    ?.name
                }
              </span>
              <FiChevronDown />
            </button>
            {showSort && renderSortDropdown()}
          </div>
        </nav>
      </header>
    </div>
  )
}

export default ResultsHeader
