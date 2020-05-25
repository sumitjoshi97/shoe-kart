export interface IProductProps {
  id: string
  name: string
  image: string
  category: string
  gender: string
  price: string
  length: number | undefined
}

export interface IProduct {
  _id: string
  name: string
  image: string[]
  category: string
  size: number[]
  color: string[]
  gender: string
  description: string
  price: string
  [key: string]: (string | number)[] | string
}

export interface ICategory {
  name: string
  count: number
}

export interface ICategoryMap {
  [key: string]: ICategory
}

export interface IFilters {
  gender: string[]
  color: string[]
  size: number[]
  [key: string]: (string | number)[]
}

export interface ISortOption {
  title: string
  value: string
}

export interface IResultsState {
  categories: ICategory[]
  activeCategory: string
  filters: IFilters | {}
  filterTypes: string[]
  activeFilters: IFilters | {}
  sortOptions: ISortOption[]
  sortBy: ISortOption | {}
  showLeftNav: boolean
}

export interface IResultsHeaderProps {
  category: string
  showLeftNav: boolean
  sortOptions: ISortOption[]
  sortBy: ISortOption
  setSortBy: (sortBy: ISortOption) => void
  toggleLeftNav: () => void
}

export interface ILeftNavProps {
  resultsStore: IResultsState
  setActiveCategory: (name: string) => void
  setActiveFilters: (filterType: string, filterOption: string | number) => void
  resetResultsStore: () => void
}

export interface IFilterProps {
  type: string
  filterOptions: (string | number)[]
  activeFilterOptions: (string | number)[]
  setActiveFilters: (filterType: string, filterOption: string | number) => void
}

export interface IFilterItemProps {
  type: string
  name: string | number
  isFilterActive: boolean
  setActiveFilters: (filterType: string, filterOption: string | number) => void
}

export interface ICategoryProps {
  categories: ICategory[]
  activeCategory: string
  setActiveCategory: (category: string) => void
}

export interface ICategoryItemProps {
  name: string
  count: number
  isActiveCategory: boolean
  setActiveCategory: (name: string) => void
}
