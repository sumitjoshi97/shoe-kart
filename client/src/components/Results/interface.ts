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

export interface IState {
  products: IProduct[]
  activeCategory: string
  activeFilters: {
    gender: string[]
    color: string[]
    size: number[]
    [key: string]: (string|number)[]
  }
}