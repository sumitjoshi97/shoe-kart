import gql from 'graphql-tag'

export const GET_PRODUCT = gql`
  query($productId: String!) {
    product(productId: $productId) {
      _id
      name
      image
      category
      size
      color
      gender
      description
      price
    }
  }
`
