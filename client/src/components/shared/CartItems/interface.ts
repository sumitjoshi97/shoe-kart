import { IProduct } from '~components/Results/interface'

export interface ICartItem {
  _id: string
  product: IProduct
  quantity: number
  selectedSize: number
}

export interface ICartItemProps {
  cartItem: ICartItem
  updateCartItem: (
    cartItemId: string,
    quantity: number,
    selectedSize: number,
  ) => void
  removeCartItem: (cartItemId: string) => void
}
