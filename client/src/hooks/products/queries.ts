import gql from 'graphql-tag'

export const fetchProducts = gql`
  query($mainCategory: ID, $categories: [ID], $sortBy: String) {
    products(
      mainCategory: $mainCategory
      categories: $categories
      sortBy: $sortBy
    ) {
      _id
      name
      image
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
      price
    }
  }
`

export const fetchProduct = gql`
  query($productId: ID!) {
    product(productId: $productId) {
      _id
      name
      image
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
      description
      price
    }
  }
`
