import React from 'react'

export interface IPaymentMethod {
  activePaymentMethod: string
  handleActivePaymentMethod: (paymentMethodId: string) => void
  paymentMethodId: string
  lastDigits: string
}

const PaymentMethod: React.FC<IPaymentMethod> = ({
  activePaymentMethod,
  handleActivePaymentMethod,
  paymentMethodId,
  lastDigits,
}) => {
  const selectStyle = {
    backgroundColor:
      paymentMethodId === activePaymentMethod ? '#000' : 'transparent',
  }

  return (
    <div
      className="payment-method"
      onClick={() => handleActivePaymentMethod(paymentMethodId)}
    >
      <span className="payment-method__select">
        <span
          className="payment-method__select__inner"
          style={selectStyle}
        ></span>
      </span>
      <span>{`xxxx-xxxx-xxxx-${lastDigits}`}</span>
    </div>
  )
}

export default PaymentMethod
