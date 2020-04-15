import React, { useContext } from 'react'
import {
  ProductsStateContext,
  ProductsDispatchContext,
} from '../../products-context'
import { IProduct } from '../../interface'
import { isArray } from 'util'
import FilterItem from './FilterItem'

interface IFilterProps {
  type: string
}

const Filter: React.FC<IFilterProps> = props => {
  const { state } = useContext(ProductsStateContext)
  const { dispatch } = useContext(ProductsDispatchContext)

  let filterOptions: (string | number)[] = []
  if (state.products) {
    state.products.forEach((product: IProduct) => {
      const options: (string | number)[] | string = product[props.type]
      if (isArray(options)) {
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

  const renderFilters = (options: (string | number)[]) => {
    return options.map((option: string | number, index: number) => (
      <FilterItem key={index + ' ' + option} name={option} />
    ))
  }

  return (
    <div className="filter">
      <div className="filter__header">{props.type}</div>
      <div className="filter__body">{renderFilters(filterOptions)}</div>
    </div>
  )
}

export default Filter
