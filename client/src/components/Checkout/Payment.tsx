import React, { useEffect } from 'react'

import Button from '~components/shared/Button'
import Dialog from '~components/shared/Dialog'
import PaymentForm from './PaymentForm'
import PaymentMethod from './PaymentMethod'

import usePayments from '~hooks/payment/usePayment'
import usePaymentMethods from '~hooks/payment/usePaymentMethods'
import isEmpty from '~helpers/isEmpty'

export interface IPaymentProps {
  activePaymentMethod: string
  isCartEmpty: boolean
  showDialog: boolean
  clearCart: () => void
  createOrder: () => void
  toggleDialog: () => void
  handleActivePaymentMethod: (paymentMethodId: string) => void
}

const Payment: React.FC<IPaymentProps> = ({
  activePaymentMethod,
  isCartEmpty,
  showDialog,
  clearCart,
  createOrder,
  handleActivePaymentMethod,
  toggleDialog,
}) => {
  const { paymentMethods } = usePaymentMethods()
  const {
    createPaymentIntentForNewCard,
    chargeUserFromSavedCard,
    clientSecret,
  } = usePayments()

  useEffect(() => {
    if (!isEmpty(paymentMethods)) {
      handleActivePaymentMethod(paymentMethods[0].id)
    }
  }, [paymentMethods])

  const handleSuccessfulPayment = () => {
    createOrder()
    clearCart()
  }

  const handlePaymentWithSavedCard = () => {
    chargeUserFromSavedCard()
    handleSuccessfulPayment()
  }

  const handleShowPaymentForm = () => {
    toggleDialog()
  }

  const renderPaymentMethods = () => {
    if (!paymentMethods && isEmpty(paymentMethods)) return

    return (
      <>
        <h3>Your credit and debit cards</h3>
        {paymentMethods.map((paymentMethod: any) => (
          <PaymentMethod
            key={paymentMethod.id}
            paymentMethodId={paymentMethod.id}
            lastDigits={paymentMethod.card.lastDigits}
            activePaymentMethod={activePaymentMethod}
            handleActivePaymentMethod={handleActivePaymentMethod}
          />
        ))}
        <Button
          onClick={handlePaymentWithSavedCard}
          styles={{ marginTop: '2rem' }}
        >
          Pay with Selected Card
        </Button>
      </>
    )
  }

  const renderPaymentForm = () => {
    return (
      <Dialog>
        <PaymentForm
          clientSecret={clientSecret}
          isCartEmpty={isCartEmpty}
          createPaymentIntent={createPaymentIntentForNewCard}
          handleSuccessfulPayment={handleSuccessfulPayment}
        />
      </Dialog>
    )
  }

  return (
    <div className="payment">
      {showDialog && renderPaymentForm()}
      <h2>payment</h2>
      <div className="payment__methods">{renderPaymentMethods()}</div>
      <div className="payment__or">
        or <div className="payment__or__divider"></div>
      </div>

      <Button color="white" onClick={handleShowPaymentForm}>
        Pay with new Card
      </Button>
    </div>
  )
}

export default Payment
