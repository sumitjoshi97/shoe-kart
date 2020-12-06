import React, { useEffect, useState } from 'react'
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'

import Button from '~components/shared/Button'

interface IPaymentFormProps {
  clientSecret: string
  isCartEmpty: boolean
  createPaymentIntent: () => void
  handleSuccessfulPayment: () => void
}

const PaymentForm: React.FC<IPaymentFormProps> = ({
  clientSecret,
  isCartEmpty,
  createPaymentIntent,
  handleSuccessfulPayment,
}) => {
  const [isProcessing, setProcessingTo] = useState<boolean>(false)
  const [paymentError, setPaymentError] = useState<string>('')

  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    if (!isCartEmpty) {
      createPaymentIntent()
    }
  }, [])

  const handleChange = async (ev: any) => {
    ev.error ? setPaymentError(ev.error.message) : setPaymentError('')
  }

  const handlePaymentSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setProcessingTo(true)

    if (!stripe || !elements) return

    const card = elements.getElement(CardNumberElement)
    if (!card) return

    const {
      paymentIntent,
      error: paymentError,
    } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    })

    if (paymentError && paymentError.message) {
      setPaymentError(paymentError.message)
      setProcessingTo(false)
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setProcessingTo(false)
      handleSuccessfulPayment()
    }
  }

  return (
    <>
      <h2>Pay with card</h2>
      <form
        className="payment-form"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
          handlePaymentSubmit(e)
        }
      >
        <div className="payment-form__row">
          <div className="input">
            <CardNumberElement
              className="input__field"
              onChange={handleChange}
            />
            <label htmlFor="cardnumber" className="input__label">
              Card number
            </label>
            <div className="input__baseline"></div>
          </div>
        </div>

        <div className="payment-form__row">
          <div className="input half-width">
            <CardExpiryElement
              className="input__field"
              onChange={handleChange}
            />
            <label htmlFor="card-expiry" className="input__label">
              Expiry
            </label>
            <div className="input__baseline"></div>
          </div>

          <div className="input half-width">
            <CardCvcElement className="input__field" onChange={handleChange} />
            <label htmlFor="card-cvc" className="input__label">
              CVC
            </label>
            <div className="input__baseline"></div>
          </div>
        </div>

        <Button
          disabled={isProcessing || !stripe}
          styles={{ marginTop: '2.4rem', flex: 1 }}
          type="submit"
        >
          {isProcessing ? 'Processing...' : 'Pay'}
        </Button>
        {paymentError && (
          <div className="payment-form__error">{paymentError}</div>
        )}
      </form>
    </>
  )
}

export default PaymentForm
