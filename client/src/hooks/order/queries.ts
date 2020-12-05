import gql from 'graphql-tag'

export const fetchOrdersQuery = gql`
  query {
    orders {
      _id
      date
      price
      quantity
      items {
        _id
        product {
          _id
          name
          image
          price
          mainCategory {
            _id
            name
          }
          categories {
            _id
            name
            parent {
              _id
              name
            }
          }
        }
        selectedSize
        quantity
      }
    }
  }
`

export const createOrderMutation = gql`
  mutation {
    createOrder {
      _id
    }
  }
`
