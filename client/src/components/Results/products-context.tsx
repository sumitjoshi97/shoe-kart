import React, { createContext, useReducer, useContext } from 'react'
import { IState } from './interface'

const initialState = {
  products: [],
  activeCategory: '',
  filterTypes: ['gender', 'color', 'size'],
  activeFilters: {
    gender: [],
    color: [],
    size: [],
  },
}

const setActiveCategory = (state: IState, category: string) => {
  if (state.activeCategory !== category) {
    return { ...state, activeCategory: category }
  } else if (state.activeCategory === category) {
    return state
  }
}

const setActiveFilters = (
  state: IState,
  filterType: string,
  filterOption: string | number,
) => {
  const filters = JSON.parse(JSON.stringify(state.activeFilters))
  let activeFilter = filters[filterType]
  if (!activeFilter.includes(filterOption)) {
    activeFilter.push(filterOption)
  } else if (activeFilter.includes(filterOption)) {
    activeFilter = activeFilter.filter(
      (option: string | number) => option !== filterOption,
    )
  }

  return {
    ...state,
    activeFilters: { ...state.activeFilters, [filterType]: activeFilter },
  }
}

const resetProducts = (state: IState) => {
  return {
    ...state,
    activeCategory: initialState.activeCategory,
    activeFilters: initialState.activeFilters,
  }
}

const reducer: React.Reducer<any, any> = (state: IState, action: any) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.products }

    case 'SET_ACTIVE_CATEGORY':
      return setActiveCategory(state, action.category)

    case 'SET_ACTIVE_FILTER':
      return setActiveFilters(state, action.filterType, action.filterOption)

    case 'RESET_PRODUCTS':
      return resetProducts(state)
    default:
      return state
  }
}

const ProductsStateContext = createContext<any>(initialState)
const ProductsDispatchContext = createContext<any>(initialState)

const ProductsProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <ProductsStateContext.Provider value={{ state }}>
      <ProductsDispatchContext.Provider value={{ dispatch }}>
        {props.children}
      </ProductsDispatchContext.Provider>
    </ProductsStateContext.Provider>
  )
}

const useProductState = () => {
  const context = useContext(ProductsStateContext)

  if (context === undefined) {
    throw Error('useProductState must be used within ProductsProvider')
  }
  return context
}

const useProductDispatch = () => {
  const context = useContext(ProductsDispatchContext)

  if (context === undefined) {
    throw Error('useProductDispatch must be used within ProductsProvider')
  }
  return context
}

export { useProductState, useProductDispatch, ProductsProvider }
