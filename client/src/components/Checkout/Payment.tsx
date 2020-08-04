import React from 'react'
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import Button from '~components/shared/Button'
import Title from '~components/shared/Title'

const Payment: React.FC<any> = ({ clearCart, createOrder }) => {
  const stripe = useStripe()
  const elements = useElements()
  const handlePaymentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (stripe && elements) {
      const card = elements.getElement(CardNumberElement)

      if (card) {
        const result = await stripe.createToken(card)
        if (result.token !== undefined) {
          createOrder(result.token.id)
          clearCart()
        }
      }
    }
    return
  }

  return (
    <div className="payment">
      <Title>payments</Title>
      <h2>₹</h2>
      <form
        className="payment__form"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
          handlePaymentSubmit(e)
        }
      >
        <div className="payment__form__row">
          <div className="input">
            <CardNumberElement className="input__field" />
            <label htmlFor="cardnumber" className="input__label">
              Card number
            </label>
            <div className="input__baseline"></div>
          </div>
        </div>

        <div className="payment__form__row">
          <div className="input half-width">
            <CardExpiryElement className="input__field" />
            <label htmlFor="card-expiry" className="input__label">
              Expiry
            </label>
            <div className="input__baseline"></div>
          </div>

          <div className="input half-width">
            <CardCvcElement className="input__field" />
            <label htmlFor="card-cvc" className="input__label">
              CVC
            </label>
            <div className="input__baseline"></div>
          </div>
        </div>

        <Button type="submit">Pay</Button>
      </form>
    </div>
  )
}

export default Payment
