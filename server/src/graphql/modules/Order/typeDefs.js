import { gql } from 'apollo-server-express'

const typeDefs = gql`
  scalar Date

  extend type Query {
    order(orderId: ID!): Order!
    orders: [Order]
  }

  extend type Mutation {
    addOrder(
      items: [OrderItemInput!]
      address: AddressInput!
      paymentType: PaymentType!
      paymentStatus: PaymentStatus!
      isOrderCompleted: Boolean!
    ): Order! @isAuth(requires: USER)
  }

  type OrderItem {
    _id: ID!
    product: Product!
    price: Int!
    quantity: Int!
  }

  type Order {
    _id: ID!
    user: User!
    userInfo: UserInfo!
    items: [OrderItem]
    date: Date!
    paymentType: PaymentType!
    paymentStatus: PaymentStatus!
    isOrderCompleted: Boolean!
  }

  input OrderItemInput {
    product: ID!
    price: Int!
    quantity: Int!
  }
`

export default typeDefs
