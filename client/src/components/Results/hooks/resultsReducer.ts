import { IResultsState, IProduct, ICategoryMap } from '../interface'

const actionTypes = {
  SET_RESULTS_STORE: 'SET_RESULTS_STORE',
  SET_ACTIVE_CATEGORY: 'SET_ACTIVE_CATEGORY',
  SET_ACTIVE_FILTERS: 'SET_ACTIVE_FILTERS',
  RESET_RESULTS_STORE: 'RESET_RESULTS_STORE',
  TOGGLE_LEFT_NAV: 'TOGGLE_LEFT_NAV',
  SET_SORT_BY: 'SET_SORT_BY',
}

const sortOptions = [
  { title: 'Featured', value: '' },
  { title: 'Price: High to Low', value: 'priceDesc' },
  { title: 'Price: Low to High', value: 'priceAsc' },
]

const initialState = {
  categories: [],
  activeCategory: '',
  filterTypes: ['gender', 'color', 'size'],
  filters: {},
  activeFilters: {},
  showLeftNav: true,
  sortOptions,
  sortBy: {},
}

const setFilterOptions = (filterType: string, products: IProduct[]) => {
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

const setInitialActiveFilters = () => {
  return initialState.filterTypes.reduce((obj: any, filterType: string) => {
    obj[filterType] = []
    return obj
  }, {})
}

const setResultsStore = (state: IResultsState, products: IProduct[]) => {
  const { filterTypes } = state

  const categories = Object.values(
    products
      .map((product: IProduct) => product.category)
      .reduce((newCategories: ICategoryMap, category: string) => {
        !newCategories[category]
          ? (newCategories[category] = { name: category, count: 1 })
          : (newCategories[category].count += 1)
        return newCategories
      }, {}),
  )

  const filters = filterTypes.reduce((obj: any, filterType: string) => {
    obj[filterType] = setFilterOptions(filterType, products)
    return obj
  }, {})

  const activeFilters = setInitialActiveFilters()

  return { ...state, categories, filters, activeFilters }
}

const setActiveCategory = (state: IResultsState, category: string) => {
  if (state.activeCategory !== category) {
    return { ...state, activeCategory: category }
  } else if (state.activeCategory === category) {
    return state
  }
}

const setActiveFilters = (
  state: IResultsState,
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

const resetResultsStore = (state: IResultsState) => {
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

//reducer for useResults reducer hook
const resultsReducer: React.Reducer<any, any> = (
  state: IResultsState,
  action: any,
) => {
  switch (action.type) {
    case actionTypes.SET_RESULTS_STORE:
      return setResultsStore(state, action.products)

    case actionTypes.SET_ACTIVE_CATEGORY:
      return setActiveCategory(state, action.category)

    case actionTypes.SET_ACTIVE_FILTERS:
      return setActiveFilters(state, action.filterType, action.filterOption)

    case actionTypes.RESET_RESULTS_STORE:
      return resetResultsStore(state)

    case actionTypes.SET_SORT_BY:
      return { ...state, sortBy: action.sortBy }

    case actionTypes.TOGGLE_LEFT_NAV:
      return { ...state, showLeftNav: !state.showLeftNav }

    default:
      return state
  }
}

export { actionTypes, initialState, resultsReducer }
