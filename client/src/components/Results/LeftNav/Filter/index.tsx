import React from 'react'
import FilterItem from './FilterItem'

interface IFilterProps {
  type: string
  filterOptions: (string | number)[]
  activeFilterOptions: (string | number)[]
  dispatch: React.Dispatch<any>
}

const Filter: React.FC<IFilterProps> = props => {
  const { type, filterOptions, activeFilterOptions, dispatch } = props
  const renderFilter = (options: (string | number)[]) => {
    return options.map((option: string | number, index: number) => (
      <FilterItem
        key={index + ' ' + option}
        name={option}
        type={type}
        isFilterActive={
          activeFilterOptions && activeFilterOptions.includes(option)
        }
        dispatch={dispatch}
      />
    ))
  }

  return (
    <div className="filter">
      <div className="filter__header">{type}</div>
      <div className="filter__options">{renderFilter(filterOptions)}</div>
    </div>
  )
}

export default Filter
