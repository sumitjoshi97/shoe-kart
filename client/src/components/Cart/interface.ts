export interface ICartItemProps {
  id: string
  productId: string
  name: string
  image: string
  price: number
  size: number
  gender: string
  category: string
  quantity: number
  selectedSize: number
  updateCartItem: (
    cartItemId: string,
    quantity: number,
    selectedSize: number,
  ) => void
  removeCartItem: (cartItemId: string) => void
}
