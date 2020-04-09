import gql from 'graphql-tag'

export const getAllProducts = gql`
  query {
    products {
      _id
      name
      image
      category
      size
      color
      gender
      price
    }
  }
`

export const getProduct = gql`
  query {
    product {
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
