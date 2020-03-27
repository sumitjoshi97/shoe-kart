import { gql } from 'apollo-server-express'

export const typeDef = gql`
  enum PaymentType {
    CREDIT_CARD
    PAYPAL
    CASH_ON_DELIVERY
  }
`
