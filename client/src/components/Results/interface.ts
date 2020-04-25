export interface IProductProps {
  id: string
  name: string
  image: string
  price: string
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
  [key: string]: (string|number)[] | string
}

export interface ICategory {
  name: string
  count: number
}

export interface IFilter {
  gender: string[]
  color: string[]
  size: number[]
  [key: string]: (string|number)[]
}

export interface IState {
  products: IProduct[]
  categories: string[]
  activeCategory: string
  filters: IFilter
  filterTypes: string[]
  activeFilters: IFilter
}