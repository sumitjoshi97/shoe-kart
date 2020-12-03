import React from 'react'

import FilterItem from './FilterItem'

import useStores from '~hooks/useStores'
import { ICategory } from '~interface'

interface IFilterProps {
  type: string
  filterOptions: ICategory[]
}

const Filter: React.FC<IFilterProps> = ({ type, filterOptions }) => {
  const { uiStore } = useStores()
  const { activeFilterCategories, handleActiveFilterCategories } = uiStore

  const handleFilter = (filter: string) => {
    handleActiveFilterCategories(filter)
  }

  const renderFilter = () => {
    return filterOptions.map((option: ICategory) => (
      <FilterItem
        key={option._id}
        id={option._id}
        name={option.name}
        type={type}
        isFilterActive={activeFilterCategories.includes(option._id)}
        setActiveFilters={handleFilter}
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
