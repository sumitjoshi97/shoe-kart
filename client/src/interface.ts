export interface IProduct {
  _id: string
  name: string
  image: string[]
  mainCategory: ICategory
  categories: ICategory[]
  description?: string
  price: number
}

export interface ICategory {
  _id: string
  name: string
  parent?: ICategory
}

export interface ICategoryTreeItem extends ICategory {
  items?: ICategory[]
}

export interface ICategoryTree {}

export interface ISortOption {
  name: string
  value: string
}

export interface ICartItem {
  _id: string
  product: IProduct
  selectedSize: string
  quantity: number
}

export interface ICart {
  price: number
  quantity: number
  items: ICartItem[]
  [key: string]: ICartItem | {}
}

export interface ILocalCart {
  price: number
  quantity: number
  items: {
    [key: string]: ICartItem
  }
}

export interface IDropdownOption {
  _id: string
  name: number
}

export interface IShippingAddress {
  street: string
  locality: string
  city: string
  state: string
  landmark: string
  contactNumber: string
}

export interface IOrderItem {
  _id: string
  product: IProduct
  quantity: number
  selectedSize: string
}

export interface IOrder {
  _id: string
  date: string
  price: number
  quantity: number
  items: IOrderItem[]
}
