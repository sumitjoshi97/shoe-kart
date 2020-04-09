import { gql } from 'apollo-server-express'

const typeDefs = gql`
  extend type Query {
    products: [Product]
    product(productId: String!): Product
  }

  extend type Mutation {
    addProduct(
      name: String!
      image: [String!]
      category: String!
      size: [Int]
      color: [String!]
      gender: String!
      description: String!
      price: Int!
    ): Product @isAuth(requires: ADMIN)

    removeProduct(_id: ID!): Product @isAuth(requires: ADMIN)
  }

  type Product {
    _id: ID!
    name: String!
    image: [String!]
    category: String
    size: [Int]
    color: [String!]
    gender: String!
    description: String!
    price: Int!
  }
`

export default typeDefs
