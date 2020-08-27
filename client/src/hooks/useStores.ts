import useAuthStore from './globalStores/useAuthStore'
import useCartStore from './globalStores/useCartStore'
import useUIStore from './globalStores/useUIStore'

const useStores = () => {
  const authStore = useAuthStore()
  const cartStore = useCartStore()
  const uiStore = useUIStore()

  return { authStore, cartStore, uiStore }
}

export default useStores
