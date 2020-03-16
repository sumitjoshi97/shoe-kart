import { gql } from 'apollo-server-express'

const typeDefs = gql`
  extend type Query {
    currentUser: User 
  }

  extend type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload
    signupAdmin(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload 
  }

  type AuthPayload {
    token: String
    user: User
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    profilePic: String
  }  
`

export default typeDefs