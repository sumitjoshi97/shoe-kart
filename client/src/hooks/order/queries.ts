import gql from 'graphql-tag'

export const fetchOrdersQuery = gql`
  query {
    orders {
      _id
      price
      quantity
      items {
        _id
        product {
          _id
          name
          image
          price
          size
          gender
          category
        }
        selectedSize
        quantity
      }
    }
  }
`

export const fetchOrderQuery = gql`
  query($orderId: ID!) {
    order(orderId: $orderId) {
      _id
      price
      quantity
      items {
        _id
        product {
          _id
          name
          image
          price
          size
          gender
          category
        }
        selectedSize
        quantity
      }
    }
  }
`

export const createOrderMutation = gql`
  mutation($token: String!) {
    createOrder(token: $token) {
      _id
    }
  }
`
