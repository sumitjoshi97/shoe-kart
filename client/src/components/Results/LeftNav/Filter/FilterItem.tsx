import React from 'react'

interface IFilterItemProps {
  type: string
  name: string | number
  isFilterActive: boolean
  dispatch: React.Dispatch<any>
}

const FilterItem: React.FC<IFilterItemProps> = props => {
  const { type, name, isFilterActive, dispatch } = props

  const setFilter = (filterType: string, filterOption: string | number) => {
    dispatch({
      type: 'SET_ACTIVE_FILTER',
      filterType,
      filterOption,
    })
  }

  let style = {}
  if (type === 'color') {
    style = {
      backgroundColor: name,
    }
  }
  if (isFilterActive) {
    style = {
      ...style,
      opacity: 0.5,
    }
    if (type === 'color') {
      style = {
        ...style,
        opacity: 1,
        border: '1px solid #afafaf',
      }
    }
  }

  return (
    <div
      className={'filter-item__' + type}
      style={style}
      onClick={() => setFilter(type, name)}
    >
      {type !== 'color' && name}
    </div>
  )
}

export default FilterItem
