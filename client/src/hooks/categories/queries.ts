import gql from 'graphql-tag'

export const fetchCategoriesQuery = gql`
  query {
    categories {
      _id
      name
      parent {
        _id
        name
      }
    }
  }
`
