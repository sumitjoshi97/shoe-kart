import gql from 'graphql-tag'

export const signupUserMutation = gql`
  mutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        _id
      }
    }
  }
`

export const loginUserMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`
