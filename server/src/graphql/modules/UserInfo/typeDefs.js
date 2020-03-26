import { gql } from 'apollo-server-express'

const typeDefs = gql`
  extend type Query {
    userInfo: UserInfo! @isAuth(requires: USER)
  }

  extend type Mutation {
    addUserInfo(address: AddressInput!): UserInfo @isAuth(requires: USER)
    updateUserInfo(address: UpdateAddressInput!): UserInfo
      @isAuth(requires: USER)
  }

  type Address {
    street: String!
    locality: String!
    city: String!
    state: String!
    landmark: String
    contactNumber: String!
  }

  type UserInfo {
    _id: ID!
    user: User!
    address: Address!
  }

  input AddressInput {
    street: String!
    locality: String!
    city: String!
    state: String!
    landmark: String
    contactNumber: String!
  }

  input UpdateAddressInput {
    street: String
    locality: String
    city: String
    state: String
    landmark: String
    contactNumber: String
  }
`

export default typeDefs
