import React, { createContext, useReducer, useContext } from 'react'
import { IState, IProduct, ICategory } from './interface'

interface category {
  [key: string]: ICategory
}

const initialState = {
  products: [],
  categories: [],
  activeCategory: '',
  filterTypes: ['gender', 'color', 'size'],
  filters: {},
  activeFilters: {},
}

const getFilterOptions = (filterType: string, products: IProduct[]) => {
  const filterOptions = products
    .map((product: IProduct) => product[filterType])
    .flat()
    .reduce(
      (options: (string | number)[], value: string | number) =>
        options.includes(value) ? options : [...options, value],
      [],
    )
  if (typeof filterOptions[0] === 'number') {
    return filterOptions.sort(
      (option1: number, option2: number) => option1 - option2,
    )
  }
  return filterOptions
}

const setProductsStore = (state: IState, products: IProduct[]) => {
  const { filterTypes } = state

  const categories = Object.values(
    products
      .map((product: IProduct) => product.category)
      .reduce((newCategories: category, category: string) => {
        !newCategories[category]
          ? (newCategories[category] = { name: category, count: 1 })
          : (newCategories[category].count += 1)
        return newCategories
      }, {}),
  )

  const filters = filterTypes.reduce((obj: any, filterType: string) => {
    obj[filterType] = getFilterOptions(filterType, products)
    return obj
  }, {})

  const activeFilters = filterTypes.reduce((obj: any, filterType: string) => {
    obj[filterType] = []
    return obj
  }, {})

  return { ...state, products, categories, filters, activeFilters }
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
  const activeFilters = state.filterTypes.reduce(
    (obj: any, filterType: string) => {
      obj[filterType] = []
      return obj
    },
    {},
  )
  return {
    ...state,
    activeCategory: initialState.activeCategory,
    activeFilters,
  }
}

const reducer: React.Reducer<any, any> = (state: IState, action: any) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return setProductsStore(state, action.products)

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
