import gql from 'graphql-tag'

export const fetchUserQuery = gql`
  query {
    currentUser {
      name
      email
    }
  }
`
