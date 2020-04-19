import React from 'react'
import FilterItem from './FilterItem'

interface IFilterProps {
  type: string
  filterOptions: (type: string) => (string | number)[]
  activeFilterOptions: (string | number)[]
  dispatch: React.Dispatch<any>
}

const Filter: React.FC<IFilterProps> = ({
  type,
  filterOptions,
  activeFilterOptions,
  dispatch,
}) => {
  const renderFilters = (options: (string | number)[]) => {
    return options.map((option: string | number, index: number) => (
      <FilterItem
        key={index + ' ' + option}
        name={option}
        type={type}
        isFilterActive={activeFilterOptions.includes(option)}
        dispatch={dispatch}
      />
    ))
  }

  return (
    <div className="filter">
      <div className="filter__header">{type}</div>
      <div className="filter__options">
        {renderFilters(filterOptions(type))}
      </div>
    </div>
  )
}

export default Filter
