import React, { useState } from 'react'
import { FiFilter, FiChevronDown } from 'react-icons/fi'
import { IResultsHeaderProps, ISortOption } from '../interface'

const ResultsHeader: React.FC<IResultsHeaderProps> = ({
  category,
  showLeftNav,
  sortOptions,
  sortBy,
  setSortBy,
  toggleLeftNav,
}) => {
  const [showSort, setShowSort] = useState<boolean>(false)

  const handleSort = (sortOption: ISortOption) => {
    if (sortBy.value !== sortOption.value) {
      setSortBy(sortOption)
    }
    setShowSort(!showSort)
  }

  const sortDropdown = (
    <div className="sort-dropdown">
      {sortOptions.map((sortOption: ISortOption, index: number) => (
        <button
          key={`${index} ${sortOption.value}`}
          className="sort-dropdown__option"
          onClick={() => handleSort(sortOption)}
        >
          {sortOption.title}
        </button>
      ))}
    </div>
  )

  return (
    <div className="results-header-container ">
      <header className="results-header">
        <h1 className="results-header__title">{category} shoes</h1>
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
              onClick={() => setShowSort(!showSort)}
            >
              Sort by
              <span>
                {sortBy.hasOwnProperty('title') ? `: ${sortBy.title}` : ''}
              </span>
              <FiChevronDown />
            </button>
            {showSort && sortDropdown}
          </div>
        </nav>
      </header>
    </div>
  )
}

export default ResultsHeader
