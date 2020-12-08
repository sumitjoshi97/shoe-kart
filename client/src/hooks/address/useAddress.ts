import { useMemo } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'

import { IShippingAddress } from '~/interface'
import useStores from '~hooks/useStores'

import {
  fetchAddressQuery,
  updateAddressMutation,
  addAddressMutation,
} from './queries'

const useAddress = () => {
  const { authStore } = useStores()
  const { isAuth } = authStore

  const {
    loading: isAddressLoading,
    data: addressData,
  } = useQuery(fetchAddressQuery, { skip: !isAuth })

  const [addAddressMutationFun, { loading: addAddressLoading }] = useMutation(
    addAddressMutation,
    {
      refetchQueries: [{ query: fetchAddressQuery }],
    },
  )

  const [
    updateAddressMutationFun,
    { loading: updateAddressLoading },
  ] = useMutation(updateAddressMutation, {
    refetchQueries: [{ query: fetchAddressQuery }],
  })

  const address = useMemo(() => {
    if (addressData && addressData.userInfo && addressData.userInfo.address) {
      return addressData.userInfo.address
    }
    return {}
  }, [addressData])

  const handleAddUserAddress = (address: IShippingAddress) => {
    return addAddressMutationFun({ variables: { address } })
  }

  const handleUpdateUserAddress = (address: IShippingAddress) => {
    return updateAddressMutationFun({ variables: { address } })
  }

  return {
    address,
    addUserAddress: handleAddUserAddress,
    updateUserAddress: handleUpdateUserAddress,
    isAddressLoading,
    addAddressLoading,
    updateAddressLoading,
  }
}

export default useAddress
