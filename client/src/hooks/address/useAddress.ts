import { useMemo } from 'react'
import { useGlobalState } from '~store'
import isEmpty from '~helpers/isEmpty'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  fetchAddressQuery,
  updateAddressMutation,
  addAddressMutation,
} from './queries'
import { IShippingAddress } from '../../components/Checkout/interface'
const useAddress = () => {
  const { state } = useGlobalState()

  const isAuth = !isEmpty(state.userId)

  const {
    loading: addressLoading,
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
    addressLoading,
    addAddressLoading,
    updateAddressLoading,
  }
}

export default useAddress
