import { useContext } from 'react'
import { CartContext } from '~context/CartContext'

const useCartStore = () => {
  const cartContext = useContext(CartContext)
  return cartContext
}

export default useCartStore
