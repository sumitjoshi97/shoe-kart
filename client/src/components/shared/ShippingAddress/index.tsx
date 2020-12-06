import React, { useState } from 'react'

import Button from '~components/shared/Button'
import ShippingAddressForm from './ShippingAddressForm'

import useAddress from '~hooks/address/useAddress'

import isEmpty from '~helpers/isEmpty'
import { IShippingAddress } from '~interface'

import './styles.scss'

const initialAddress: IShippingAddress = {
  street: '',
  locality: '',
  city: '',
  state: '',
  landmark: '',
  contactNumber: '',
}

const ShippingAddress = () => {
  const [isEditEnable, setIsEditEnable] = useState<boolean>(false)
  const { address, addUserAddress, updateUserAddress } = useAddress()

  const [shippingAddress, setShippingAddress] = useState<IShippingAddress>(
    initialAddress,
  )

  const handleShippingInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingAddress({ ...shippingAddress, [name]: value })
  }

  const handleShippingAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isEmpty(address)) {
      addUserAddress(shippingAddress)
    } else {
      updateUserAddress(shippingAddress)
      setIsEditEnable(false)
    }
  }

  const handleEditShippingAddress = () => {
    const { street, locality, city, state, landmark, contactNumber } = address
    const oldAddress = {
      street,
      locality,
      city,
      state,
      landmark: landmark || '',
      contactNumber,
    }

    setIsEditEnable(true)
    setShippingAddress(oldAddress)
  }

  const shippingData = (
    <div className="shipping-address__data">
      {`${address.street}, 
        ${address.locality}, 
        ${address.street}, 
        ${address.city}, 
        ${address.state}, 
        ${address.landmark},
        ${address.contactNumber}`}
      <Button onClick={handleEditShippingAddress}>Update</Button>
    </div>
  )

  const renderShipping = () => {
    if (!isEmpty(address) && !isEditEnable) {
      return shippingData
    }
    return (
      <ShippingAddressForm
        shippingAddress={shippingAddress}
        handleShippingInput={handleShippingInput}
        handleShipping={handleShippingAddress}
      />
    )
  }

  return (
    <div className="shipping-address">
      <h2 className="title-primary">shipping address</h2>
      {renderShipping()}
    </div>
  )
}

export default ShippingAddress
