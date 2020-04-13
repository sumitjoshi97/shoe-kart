import React, { createContext, useReducer } from 'react'
import { IState } from './interface'

const initialState = {
  products: [],
  activeCategory: '',
  activeFilterGender: '',
  activeFilterColors: [],
  activeFilterSizes: [],
}

const setActiveCategory = (state: IState, category: string) => {
  if (state.activeCategory !== category) {
    return { ...state, activeCategory: category }
  } else if (state.activeCategory === category) {
    return state
  }
}

const reducer: React.Reducer<any, any> = (state: IState, action: any) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.products }

    case 'SET_ACTIVE_CATEGORY':
      return setActiveCategory(state, action.category)

    default:
      return state
  }
}

export const ProductsStateContext = createContext<any>(initialState)
export const ProductsDispatchContext = createContext<any>(initialState)

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

export default ProductsProvider
