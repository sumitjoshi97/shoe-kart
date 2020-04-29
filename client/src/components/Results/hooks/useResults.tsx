import { useReducer } from 'react'
import { actionTypes, initialState, resultsReducer } from './resultsReducer'
import { IProduct, ICategory, ISortOption } from '../interface'

const useResults = () => {
  const [resultsStore, dispatch] = useReducer(resultsReducer, initialState)

  const setResultsStore = (products: IProduct) =>
    dispatch({ type: actionTypes.SET_RESULTS_STORE, products })

  const setActiveCategory = (category: ICategory) =>
    dispatch({ type: actionTypes.SET_ACTIVE_CATEGORY, category })

  const setActiveFilters = (
    filterType: string,
    filterOption: string | number,
  ) =>
    dispatch({ type: actionTypes.SET_ACTIVE_FILTERS, filterType, filterOption })

  const resetResultsStore = () =>
    dispatch({ type: actionTypes.RESET_RESULTS_STORE })

  const setSortBy = (sortBy: ISortOption) =>
    dispatch({ type: actionTypes.SET_SORT_BY, sortBy })

  const toggleLeftNav = () => dispatch({ type: actionTypes.TOGGLE_LEFT_NAV })

  return {
    resultsStore,
    setResultsStore,
    setActiveCategory,
    setActiveFilters,
    resetResultsStore,
    setSortBy,
    toggleLeftNav,
  }
}

export default useResults
