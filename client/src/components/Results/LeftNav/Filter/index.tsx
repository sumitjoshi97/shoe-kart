import React from 'react'
import FilterItem from './FilterItem'
import { IFilterProps } from '../../interface'

const Filter: React.FC<IFilterProps> = props => {
  const { type, filterOptions, activeFilterOptions } = props

  const renderFilter = () => {
    return filterOptions.map((option: string | number, index: number) => (
      <FilterItem
        key={index + ' ' + option}
        name={option}
        type={type}
        isFilterActive={
          activeFilterOptions && activeFilterOptions.includes(option)
        }
        setActiveFilters={props.setActiveFilters}
      />
    ))
  }

  return (
    <div className="filter">
      <div className="filter__header">{type}</div>
      <div className="filter__options">{renderFilter()}</div>
    </div>
  )
}

export default Filter
