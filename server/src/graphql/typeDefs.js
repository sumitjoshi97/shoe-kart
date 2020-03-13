import { gql } from 'apollo-server'

const typeDefs = gql`
  type AuthPayload {
    token: String
    user: User
  }

  type User {
    _id: ID!,
    name: String!,
    email: String!,
    password: String!,
    profilePic: String
  }

  type Query {
    text: String
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload 
  }
`

export default typeDefs