import React, { useState } from 'react'
import Input from '~components/shared/Input'
import Button from '~components/shared/Button'
import { IShippingAddress } from './interface'
import useAddress from '~hooks/address/useAddress'
import isEmpty from '~helpers/isEmpty'
import Title from '~components/shared/Title'

const initialShippingAddress: IShippingAddress = {
  street: '',
  locality: '',
  city: '',
  state: '',
  landmark: '',
  contactNumber: '',
}

const Shipping: React.FC = () => {
  const [shippingAddress, setShippingAddress] = useState<IShippingAddress>(
    initialShippingAddress,
  )
  const [isEditEnable, setIsEditEnable] = useState<boolean>(false)
  const { address, addUserAddress, updateUserAddress } = useAddress()

  const handleShippingInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingAddress({ ...shippingAddress, [name]: value })
  }

  const handleShipping = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isEmpty(address)) {
      addUserAddress(shippingAddress)
    } else {
      updateUserAddress(shippingAddress)
      setIsEditEnable(false)
    }
  }

  const handleEditShipping = () => {
    setIsEditEnable(true)
    setShippingAddress(address)
  }

  const renderShipping = () => {
    if (!isEmpty(address) && !isEditEnable) {
      return shippingData
    }
    return shippingForm
  }

  const shippingForm = (
    <form onSubmit={e => handleShipping(e)}>
      <Input
        type="text"
        label="street"
        name="street"
        inputValue={shippingAddress['street']}
        handleInput={handleShippingInput}
      />
      <Input
        type="text"
        label="locality"
        name="locality"
        inputValue={shippingAddress['locality']}
        handleInput={handleShippingInput}
      />
      <Input
        type="text"
        label="city"
        name="city"
        inputValue={shippingAddress['city']}
        handleInput={handleShippingInput}
      />
      <Input
        type="text"
        label="state"
        name="state"
        inputValue={shippingAddress['state']}
        handleInput={handleShippingInput}
      />
      <Input
        type="text"
        label="landmark"
        name="landmark"
        inputValue={shippingAddress['landmark']}
        handleInput={handleShippingInput}
      />
      <Input
        type="text"
        label="contact number"
        name="contactNumber"
        inputValue={shippingAddress['contactNumber']}
        handleInput={handleShippingInput}
      />
      <Button type="submit">Next</Button>
    </form>
  )

  const shippingData = (
    <div className="shipping__data">
      {`${address.street}, 
        ${address.locality}, 
        ${address.street}, 
        ${address.city}, 
        ${address.state}, 
        ${address.landmark}`}
      <Button onClick={handleEditShipping}>edit</Button>
    </div>
  )

  return (
    <div className="shipping">
      <Title>shipping address</Title>
      {renderShipping()}
    </div>
  )
}

export default Shipping
