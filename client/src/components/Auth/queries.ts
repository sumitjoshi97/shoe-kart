import gql from 'graphql-tag'

export const signupUser = gql`
  mutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        _id
      }
    }
  }
`

export const loginUser = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`