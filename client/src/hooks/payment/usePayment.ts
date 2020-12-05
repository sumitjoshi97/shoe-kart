import { useMemo } from 'react'
import { useMutation } from 'react-apollo'

import useStores from '~hooks/useStores'

import { chargeUserCardMutation, createPaymentIntentMutation } from './queries'

const usePayments = () => {
  const { uiStore } = useStores()
  const { activePaymentMethod } = uiStore

  const [
    createPaymentIntentMutationFun,
    { data: createPaymentIntentData },
  ] = useMutation(createPaymentIntentMutation)

  const [chargeUserMutationFun, { data: chargeUserData }] = useMutation(
    chargeUserCardMutation,
  )

  const createPaymentIntentForNewCard = () => {
    createPaymentIntentMutationFun()
  }

  const chargeUserFromSavedCard = () => {
    chargeUserMutationFun({
      variables: {
        paymentMethod: activePaymentMethod,
      },
    })
  }

  const clientSecret = useMemo(() => {
    if (createPaymentIntentData) {
      return createPaymentIntentData.createPaymentIntent.clientSecret
    }
    return null
  }, [createPaymentIntentData, createPaymentIntentData?.createPaymentIntent])

  return {
    createPaymentIntentForNewCard,
    chargeUserFromSavedCard,
    clientSecret,
    chargeUserData,
  }
}

export default usePayments
