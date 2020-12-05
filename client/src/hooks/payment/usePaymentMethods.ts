import { useMemo } from 'react'
import { useQuery } from 'react-apollo'

import useStores from '~hooks/useStores'

import { fetchPaymentMethods } from './queries'

const usePaymentMethods = () => {
  const { authStore } = useStores()
  const { isAuth } = authStore

  const { loading: paymentMethodsLoading, data: paymentMethodsData } = useQuery(
    fetchPaymentMethods,
    {
      skip: !isAuth,
      fetchPolicy: 'cache-and-network',
    },
  )

  const paymentMethods = useMemo(() => {
    if (paymentMethodsData && paymentMethodsData.paymentMethods) {
      return paymentMethodsData.paymentMethods
    }
    return []
  }, [paymentMethodsData, paymentMethodsData?.paymentMethods])

  return {
    paymentMethods,
    paymentMethodsLoading,
  }
}

export default usePaymentMethods
