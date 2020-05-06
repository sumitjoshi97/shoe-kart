import React from 'react'
import { FiCheck } from 'react-icons/fi'
import { IFilterItemProps } from '../../interface'

const FilterItem: React.FC<IFilterItemProps> = props => {
  const { type, name, isFilterActive, setActiveFilters } = props

  const isColorValid = (name: string) => {
    let style = new Option().style
    style.color = name
    return style.color == name
  }

  const className =
    type === 'size' || type === 'color' ? `is--${type}` : 'is--default'

  const getFilterItem = () => {
    switch (type) {
      case 'color':
        return (
          <>
            <div
              className="filter-item__color-patch"
              style={{ backgroundColor: name as string }}
            >
              {isFilterActive && (
                <FiCheck
                  size="1.6rem"
                  color={
                    name !== 'white' && isColorValid(name as string)
                      ? '#fff'
                      : '#000'
                  }
                />
              )}
            </div>
            <span className="filter-item__name">{name}</span>
          </>
        )

      case 'size':
        return <span className="filter-item__name">{name}</span>

      default:
        return (
          <>
            <div
              className="filter-item__checkbox"
              style={{ backgroundColor: isFilterActive ? '#000' : '#fff' }}
            >
              {isFilterActive && <FiCheck color="#fff" />}
            </div>
            <span className="filter-item__name">{name}</span>
          </>
        )
    }
  }

  return (
    <button
      className={`filter-item ${className}`}
      onClick={() => setActiveFilters(type, name)}
      style={{
        border:
          type === 'size'
            ? isFilterActive
              ? '1.2px solid #000'
              : '1px solid #d7d7d7'
            : '',
      }}
    >
      {getFilterItem()}
    </button>
  )
}

export default FilterItem
