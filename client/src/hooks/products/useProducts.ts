import { useEffect, useMemo } from 'react'
import { useQuery } from 'react-apollo'

import useStores from '~hooks/useStores'
import { fetchProducts } from './queries'

const useProducts = () => {
  const { uiStore } = useStores()
  const { activeMainCategory, activeFilterCategories, sortBy } = uiStore

  const {
    loading: productsLoading,
    data: productsData,
    refetch: refetchProducts,
  } = useQuery(fetchProducts, {
    variables: {
      mainCategory: activeMainCategory,
      categories:
        activeFilterCategories.length > 0 ? activeFilterCategories : null,
      sortBy,
    },
  })

  useEffect(() => {
    refetchProducts()
  }, [activeMainCategory, activeFilterCategories, sortBy])

  const products = useMemo(() => {
    if (!productsLoading && productsData && productsData.products) {
      return productsData.products
    }
  }, [productsData])

  return {
    products,
    productsLoading,
  }
}

export default useProducts
