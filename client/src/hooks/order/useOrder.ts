import { useMemo } from 'react'
import { useGlobalState } from '~store'
import isEmpty from '~helpers/isEmpty'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { fetchOrdersQuery, createOrderMutation } from './queries'

const useOrder = () => {
  const { state } = useGlobalState()

  const isAuth = !isEmpty(state.userId)

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
      return ordersData.data.orders
    }
    return {}
  }, [ordersData])

  const handleCreateOrder = (token: string) => {
    console.log('@@token create order', token)
    if (token) {
      return createOrderMutationFun({
        variables: { token },
      })
    }
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
