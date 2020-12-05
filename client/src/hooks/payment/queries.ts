import gql from 'graphql-tag'

export const fetchPaymentMethods = gql`
  query {
    paymentMethods {
      id
      card {
        brand
        expMonth
        expYear
        fingerprint
        funding
        lastDigits
      }
    }
  }
`

export const chargeUserCardMutation = gql`
  mutation {
    chargeUserCard {
      id
    }
  }
`

export const createPaymentIntentMutation = gql`
  mutation {
    createPaymentIntent {
      clientSecret
    }
  }
`
