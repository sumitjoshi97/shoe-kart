import React from 'react'

import Input from '~components/shared/Input'
import Button from '~components/shared/Button'

import { IShippingAddress } from '~interface'

export interface IShippingAddressFormProps {
  shippingAddress: IShippingAddress
  handleShippingInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleShipping: (e: React.FormEvent<HTMLFormElement>) => void
}

const ShippingAddressForm: React.FC<IShippingAddressFormProps> = ({
  shippingAddress,
  ...props
}) => {
  return (
    <form
      onSubmit={e => props.handleShipping(e)}
      className="shipping-address-form"
    >
      <Input
        type="text"
        label="street"
        name="street"
        inputValue={shippingAddress['street']}
        handleInput={props.handleShippingInput}
      />
      <Input
        type="text"
        label="locality"
        name="locality"
        inputValue={shippingAddress['locality']}
        handleInput={props.handleShippingInput}
      />
      <Input
        type="text"
        label="city"
        name="city"
        inputValue={shippingAddress['city']}
        handleInput={props.handleShippingInput}
      />
      <Input
        type="text"
        label="state"
        name="state"
        inputValue={shippingAddress['state']}
        handleInput={props.handleShippingInput}
      />
      <Input
        type="text"
        label="landmark"
        name="landmark"
        inputValue={shippingAddress['landmark']}
        handleInput={props.handleShippingInput}
      />
      <Input
        type="text"
        label="contact number"
        name="contactNumber"
        inputValue={shippingAddress['contactNumber']}
        handleInput={props.handleShippingInput}
      />
      <Button type="submit" styles={{ marginTop: '2rem' }}>
        Save Address
      </Button>
    </form>
  )
}

export default ShippingAddressForm
