export interface ProductProps {
  id: string
  name: string
  image: string
  price: string
}

export interface Product {
  _id: string
  name: string
  image: string[]
  category: string[]
  size: number[]
  color: string[]
  gender: string
  description: string
  price: string
}