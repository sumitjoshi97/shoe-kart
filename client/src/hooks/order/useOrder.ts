import { useMemo } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { fetchOrdersQuery, createOrderMutation } from './queries'
import useStores from '~hooks/useStores'

const useOrder = () => {
  const { authStore } = useStores()
  const { isAuth } = authStore

  const { loading: ordersLoading, data: ordersData } = useQuery(
    fetchOrdersQuery,
    {
      skip: !isAuth,
    },
  )

  const [
    createOrderMutationFun,
    { loading: createOrderLoading, data: createdOrderData },
  ] = useMutation(createOrderMutation)

  const orders = useMemo(() => {
    if (ordersData) {
      return ordersData.orders
    }
    return []
  }, [ordersData])

  const handleCreateOrder = () => {
    createOrderMutationFun({
      refetchQueries: [{ query: fetchOrdersQuery }],
    })
  }

  return {
    orders,
    ordersLoading,
    createOrder: handleCreateOrder,
    createdOrderData,
    createOrderLoading,
  }
}

export default useOrder
